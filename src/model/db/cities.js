const db = require('./db')

const getPostsByCityId = (id) => {
  const sql = `SELECT * FROM cities JOIN posts ON cities.id = posts.city_id
    WHERE cities.id= $1 ORDER BY date DESC`
  return db.manyOrNone(sql, id)
}

const getAllCities = () => {
  const sql = 'SELECT * FROM cities'
  return db.many(sql)
}

module.exports = { getPostsByCityId, getAllCities }
