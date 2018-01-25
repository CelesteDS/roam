const db = require('./db')

const getPostsByCityId = (id) => {
  const sql = `SELECT * FROM cities
JOIN posts ON cities.id = posts.city_id
WHERE cities.id= $1 ORDER BY post_date DESC `
  return db.query(sql, id)
}

const getAllCities = () => {
  const sql = `SELECT * FROM cities`
  return db.query(sql)
}

module.exports = { getPostsByCityId, getAllCities}
