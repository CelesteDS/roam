const db = require('./db')
const addUser = (fullname, email, password, city) => {
  const sql = 'INSERT INTO users (fullname, email, password, city) VALUES ($1, $2, $3, $4) RETURNING *'
  return db.one(sql, [fullname, email, password, city])
}

const verifyUser = (email) => {
  const sql = 'SELECT * FROM users WHERE email= $1'
  return db.one(sql, email)
}

const updateProfile = (id, fullname, email, password, city) => {
  const sql = 'UPDATE users SET fullname = $2, email = $3, password = $4, city = $5 WHERE id= $1 RETURNING *'
  return db.one(sql, [id, fullname, email, password, city])
}

const userById = (id) => {
  const sql = 'SELECT fullname, city, join_date FROM users WHERE id = $1'
  return db.one(sql, id)
}

module.exports = { addUser, verifyUser, updateProfile, userById }
