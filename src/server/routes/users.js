const router = require('express').Router()
const moment = require('moment')

const { getUserById, updateProfile } = require('../../model/db/users')
const { getPostsByUserId } = require('../../model/db/posts')

router.get('/profile/:id', (req, res) => {
  const id = Number(req.params.id)
  const ownPage = (req.session.user.id === id) ? true : false

  getUserById(id)
  .then((user) => {
    getPostsByUserId(id)
      .then((posts) => {
        let signupDate = moment(user.join_date).format("dddd, MMMM Do YYYY")
        res.render('profile', { user, posts, ownPage, signupDate })
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

module.exports = router
