const router = require('express').Router()

const { addUser, verifyUser, updateProfile, userById,  } = require('../../model/db/users')
const { addPost, getPostsByUserId } = require('../../model/db/posts')
 const { sessionChecker, hashPassword, comparePassword } = require('./utils')

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
  console.log(fullName)
  hashPassword(password).then((hashedPassword) => {
    console.log('i sucessfully hashed the password')
    addUser(fullName, email, hashedPassword, city)
      .then((user) => {
        console.log('in addUsers then')
        if (user) {
          req.session.user_id = user.id
          console.log('session user id is '+ req.session.user_id)
          return res.redirect(`/profile/${user.id}`)
        }
        next()
      })
      .catch(console.error)
    })
})

router.get('/login', (req, res, next) => {
  res.render('login')
  next()
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  verifyUser(email)
    .then((user) => {
      comparePassword(password, user.password)
        .then((isValid) => {
          if (isValid) {
            req.session.user_id = user.id
            return res.redirect(`/profile/${user.id}`)
          } else {
            return res.redirect('/login')
          }
          next()
        })
    })
    .catch(console.error)
})

router.get('/logout', (req, res, next) => {
  req.session.destroy()
  res.redirect('/')
  next()
})

router.get('/profile/:id', (req, res, next) => {
  const loggedIn = (req.session.user_id === undefined) ? false : true
  const id = Number(req.params.id)
  const ownPage = (req.session.user_id === id) ? true : false
  userById(id)
  .then((user) => {
    getPostsByUserId(id)
      .then((posts) => {
        return res.render('profile', { user, loggedIn, posts, ownPage })
        next()
      })
  })
  .catch(console.error)
})

router.post('/profile-update', (req, res) => {
  const { newName, newCity } = req.body
  console.log("(ᗒᗣᗕ) (•̀o•́)ง req.body", req.body )
  const id = req.session.user_id
  updateProfile(id, newName, newCity)
    .then((result) => {
      return res.send(result)
    })
})

module.exports = router
