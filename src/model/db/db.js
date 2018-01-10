const pgp = require('pg-promise')({ /* default initalization options */})

const connectionString = process.env.DATABASE_URL
const db = pgp({ connectionString })

module.exports = db
