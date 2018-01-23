const router = require('express').Router()
const { addPost, getPostsByUserId, getPostById } = require('../../model/db/posts')
const { getUserById } = require('../../model/db/users')

router.get('/profile/:id', (req, res) => {
  const id = Number(req.params.id)
  const ownPage = (req.session.user.id === id) ? true : false
  getUserById(id)
  .then((user) => {
    getPostsByUserId(id)
      .then((posts) => {
        res.render('profile', { user, posts, ownPage })
      })
      .catch(console.error)
  })
  .catch(console.error)
})

router.put('/profile-update', (req, res) => {
  const { newName, newCity } = req.body
  const id = req.session.user.id
  updateProfile(id, newName, newCity)
    .then((result) => {
      res.send(result)
    })
})

router.get('/post/:id', (req, res) => {
  getPostById(Number(req.params.id))
    .then((post) => {
      res.render('post', { post })
    })
})

module.exports = router
