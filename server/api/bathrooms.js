const router = require('express').Router()
const { Bathroom } = require('../db/models')
const geolib = require('geolib')
const { Op } = require('sequelize')

router.get('/:latitude/:longitude/:radius', async (req, res, next) => {
  try {
    // console.log(req.body, 'body')
    const radius = req.params.radius
    const point = {
      latitude: req.params.latitude,
      longitude: req.params.longitude,
    }
    const result = geolib.getBoundsOfDistance(point, radius)
    // console.log(result, 'result')
    const bathrooms = await Bathroom.findAll({
      where: {
        latitude: { [Op.between]: [result[0].latitude, result[1].latitude] },
        longitude: { [Op.between]: [result[0].longitude, result[1].longitude] },
      },
    })
    res.json(bathrooms)
  } catch (err) {
    next(err)
  }
})

router.get('/:bathroomId/:reviews', async (req, res, next) => {
  //To get recent, pass number of days to /:id/reviews?daysWithin=<numOfDays>
  try {
    console.log('valmik',req.params.bathroomId);
    const bathroom = await Bathroom.findByPk(req.params.bathroomId)
    console.log(bathroom, 'bthrm');
    let reviews
    if (req.query.daysWithin !== undefined) {
      reviews = await bathroom.getReviews(req.query.daysWithin)
    } else {
      reviews = await bathroom.getReviews()
    }
    console.log(reviews, 'reviews in api')
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/rating', async (req, res, next) => {
  try {
    const bathroom = await Bathroom.findByPk(req.params.id)
    const rating = await bathroom.getAvgRating()
    res.json(rating)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/checkins', async (req, res, next) => {
  //To get recent, pass number of days to /:id/checkins?daysWithin=<numOfDays>
  try {
    const bathroom = await Bathroom.findByPk(req.params.id)
    let checkins
    if (req.query.daysWithin) {
      checkins = await bathroom.getReviews(req.query.daysWithin)
    } else {
      checkins = await bathroom.getReviews()
    }
    res.json(checkins)
  } catch (err) {
    next(err)
  }
})

module.exports = router
