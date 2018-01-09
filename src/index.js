const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')
const pgp = require('pg-promise')({ /* default initalization options */})
const pgSession = require('connect-pg-simple')
const dotenv = require('dotenv').config()

// const routes = require('./server/routes')

const connectionString = process.env.DATABASE_URL
const db = pgp({ connectionString })

const app = express()

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(session({
  store: new (require('connect-pg-simple')(session))(),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
}))

// app.use(routes)



const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

module.exports = db
