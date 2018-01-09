const router = require('express').Router()
const { addUser, verifyUser, updateProfile } = require('../../model/db/users')
// const { sessionChecker, loggedIn } = require('./utils')

router.get('/', (req, res, next) => {
  const loggedIn = (req.session.user_id === undefined) ? false : true
  //console.log('logged in? ' + req.session.user_id)
  res.render('index', { loggedIn } )
})

router.get('/sign-up', (req, res, next) => {
  res.send("signup route"/*signup form ejs goes here*/)
  next()
})

router.get('/log-in', (req, res, next) => {
  res.render(/*log in form ejs goes here*/)
  next()
})




module.exports = router
