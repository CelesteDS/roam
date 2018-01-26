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

const getCityById = (id) => {
  const sql = 'SELECT * FROM cities WHERE id = $1'
  return db.one(sql, id)
}
module.exports = { getPostsByCityId, getAllCities, getCityById }
