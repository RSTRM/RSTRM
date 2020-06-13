const router = require('express').Router()
const { Bathroom } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const bathrooms = await Bathroom.findAll({})
    res.json(bathrooms)
  } catch (err) {
    next(err)
  }
})
