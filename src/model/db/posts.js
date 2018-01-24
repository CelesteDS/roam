const db = require('./db')

const addPost = (title, author_id, city_id, content) => {
  const sql = 'INSERT INTO posts (title, author_id, city_id, content) VALUES ($1, $2, $3, $4) RETURNING *'
  return db.one(sql, [title, author_id, city_id, content])
}

const getPostsByUserId = (id) => {
  const sql = 'SELECT * FROM posts WHERE author_id= $1'
  return db.any(sql, id)
}

const getPostById = (id) => {
  const sql = 'SELECT title, posts.city_id, content, users.fullName FROM posts JOIN users ON author_id=users.id WHERE posts.id= $1'
  return db.one(sql, id)
}

module.exports = { addPost, getPostsByUserId, getPostById }
