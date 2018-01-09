const router = require('express').Router()
const { addUser, verifyUser, updateProfile } = require('../../model/db/users')

router.get('/', (req, res, next) => {
  res.render('index')
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
