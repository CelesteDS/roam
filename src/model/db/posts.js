const db = require('./db')

const addPost = (title, author, city, content) => {
  const sql = 'INSERT INTO posts (title, author, city, content) VALUES ($1, $2, $3, $4) RETURNING *'
  return db.one(sql, [title, author, city, content])
}

const getPostsByUserId = (id) => {
  const sql = 'SELECT * FROM posts WHERE author= $1'
  return db.any(sql, id)
}


module.exports = { addPost, getPostsByUserId }
