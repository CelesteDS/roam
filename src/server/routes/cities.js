const router = require('express').Router()
const moment = require('moment')

const { getPostsByCityId } = require('../../model/db/posts')

router.get('/cities/:id', (req, res) => {
  const cityId = req.params.id

  getPostsByCityId(cityId)
    .then((postInfo) => {
      postInfo.forEach((element) => {
        element.date = moment(element.date).format('dddd, MMMM Do YYYY')
      })
      res.render('cities', { postInfo })
    })
    .catch(console.error)
})

module.exports = router
