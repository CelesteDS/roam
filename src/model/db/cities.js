const db = require('./db')

const getPostsByCityId = (id) => {
  const sql = 'SELECT * FROM posts WHERE city_id= $1 ORDER BY post_date DESC '
  return db.any(sql, id)
}
