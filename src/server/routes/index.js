const router = require('express').Router()

const { addUser, verifyUser, updateProfile, userById,  } = require('../../model/db/users')
const { addPost, getPostsByUserId, getPostById } = require('../../model/db/posts')
 const { sessionChecker, hashPassword, comparePassword } = require('./utils')

router.get('/', (req, res) => {
  const loggedIn = (req.session.user === undefined) ? false : true
  res.render('index', { loggedIn } )
})

router.get('/signup', (req, res) => {
  res.render('signup')

})

router.post('/signup', (req, res) => {
  const { fullName, email, password, city } = req.body
  hashPassword(password).then((hashedPassword) => {
    addUser(fullName, email, hashedPassword, city)
      .then((user) => {
        if (user) {
          req.session.user = user
          console.log("(ᗒᗣᗕ) (•̀o•́)ง req.session", req.session.user.id)
          return res.redirect(`/profile/${user.id}`)
        }

      })
      .catch(console.error)
    })
})

router.get('/login', (req, res) => {
  res.render('login')

})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  verifyUser(email)
    .then((user) => {
      comparePassword(password, user.password)
        .then((isValid) => {
          if (isValid) {
            req.session.user = user
            return res.redirect(`/profile/${user.id}`)
          } else {
            return res.redirect('/login')
          }

        })
    })
    .catch(console.error)
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')

})

router.get('/profile/:id', (req, res) => {
  const loggedIn = (req.session.user === undefined) ? false : true
  const id = Number(req.params.id)
  const ownPage = (req.session.user.id === id) ? true : false
  userById(id)
  .then((user) => {
    getPostsByUserId(id)
      .then((posts) => {
        return res.render('profile', { user, loggedIn, posts, ownPage })

      })
  })
  .catch(console.error)
})

router.put('/profile-update', (req, res) => {
  const { newName, newCity } = req.body
  const id = req.session.user.id
  updateProfile(id, newName, newCity)
    .then((result) => {
      return res.send(result)
    })
})

router.get('/post/:id', (req, res) => {
  getPostById(Number(req.params.id))
    .then((post) => {
      res.render('post', { post })
    })
})

module.exports = router
