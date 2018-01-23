const db = require('./db')
const addUser = (fullname, email, password, city) => {
  const sql = 'INSERT INTO users (fullname, email, password, city) VALUES ($1, $2, $3, $4) RETURNING *'
  return db.one(sql, [fullname, email, password, city])
}

const verifyUser = (email) => {
  const sql = 'SELECT * FROM users WHERE email= $1'
  return db.one(sql, email)
}

const updateProfile = (id, newName, newCity) => {
  const sql = 'UPDATE users SET fullname = $1, city = $2 WHERE id= $3 RETURNING *'
  return db.oneOrNone(sql, [newName, newCity, id])
    .then((result) => {
      if(result) return { success: true, message: 'Your profile is updated! yay' }
      return { success: false, message: 'You did something wonkey... try again'}
    })
    .catch(err => Object({ success: false, message: err.message }))
}

const getUserById = (id) => {
  const sql = 'SELECT fullname, city, join_date FROM users WHERE id = $1'
  return db.one(sql, id)
}

module.exports = { addUser, verifyUser, updateProfile, getUserById }
