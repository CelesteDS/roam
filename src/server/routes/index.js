const router = require('express').Router()
const { addUser, verifyUser, updateProfile } = require('../../model/db/users')
// const { sessionChecker, loggedIn } = require('./utils')

router.get('/', (req, res, next) => {
  const loggedIn = (req.session.user_id === undefined) ? false : true
  //console.log('logged in? ' + req.session.user_id)
  res.render('index', { loggedIn } )
})

router.get('/signup', (req, res, next) => {
  res.render('signup')
  next()
})

router.post('/signup', (req, res, next) => {
  const { fullName, email, password, city } = req.body
  addUser(fullName, email, password, city)
    .then((user) => {
      if (user) {
        req.session.user_id = user.id
        return res.redirect(`/profile/${user.id}`)
      }
      next()
    })
    .catch(console.error)
})

router.get('/login', (req, res, next) => {
  res.render('login')
  next()
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  verifyUser(email)
    .then((user) => {
      //later use bcrypt compare :)
      if (user.password === password) {
        req.session.user_id = user.id
        return res.redirect(`/profile/${user.id}`)

      } else {
        return res.redirect('/login')
      }
      next()
    })
    .catch(console.error)
})

router.get('/logout', (req, res, next) => {
  req.session.destroy()
  res.redirect('/')
  next()
})



module.exports = router
