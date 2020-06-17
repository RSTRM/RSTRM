const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'totalCheckins', 'admin'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/reviews', async (req, res, next) => {
  //To get recent, pass number of days to /:id/checkins?daysWithin=<numOfDays>
  try {
    const user = await User.findByPk(req.params.id)
    let reviews
    if (req.query.daysWithin) {
      reviews = await user.getReviews(req.query.daysWithin)
    } else {
      reviews = await user.getReviews()
    }
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/checkins', async (req, res, next) => {
  //To get recent, pass number of days to /:id/checkins?daysWithin=<numOfDays>
  try {
    const user = await User.findByPk(req.params.id)
    let checkins
    if (req.query.daysWithin) {
      checkins = await user.getReviews(req.query.daysWithin)
    } else {
      checkins = await user.getReviews()
    }
    res.json(checkins)
  } catch (err) {
    next(err)
  }
})
