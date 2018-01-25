const db = require('./db')

const addUser = (fullName, email, password, current_city) => {
  const sql = 'INSERT INTO users (full_name, email, password, current_city) VALUES ($1, $2, $3, $4) RETURNING *'
  return db.one(sql, [fullName, email, password, current_city])
}

const verifyUser = (email) => {
  const sql = 'SELECT * FROM users WHERE email= $1'
  return db.one(sql, email)
}

const updateProfile = (id, newName, newCity) => {
  const sql = 'UPDATE users SET full_name = $1, current_city = $2 WHERE id= $3 RETURNING *'
  return db.oneOrNone(sql, [newName, newCity, id])
    .then((result) => {
      if(result) return { success: true, message: 'Your profile is updated! yay' }
      return { success: false, message: 'You did something wonkey... try again'}
    })
    .catch(err => Object({ success: false, message: err.message }))
}

const getUserById = (id) => {
  const sql = 'SELECT full_name, current_city, joined_at FROM users WHERE id = $1'
  return db.one(sql, id)
}

module.exports = { addUser, verifyUser, updateProfile, getUserById }
