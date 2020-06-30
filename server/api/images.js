const router = require('express').Router()
const {Bathroom, Image} = require('../db/models')
const geolib = require('geolib')
const {Op} = require('sequelize')

router.get('/:bathroomId', async (req, res, next) => {
  try {
    const bathroom = await Bathroom.findByPk(req.params.bathroomId)
    const images = await Image.findAll({include: [{model: Bathroom}]})

    //console.log(images, 'images in server')
    res.json(images)
  } catch (err) {
    next(err)
  }
})

router.post('/:refugeId/:url', async (req, res, next) => {
  try {
    const url = req.params.url
    const id = req.params.refugeId
    const bathroom = await Bathroom.findAll({
        where: {
            refugeId: id
        }
    });
    let images;
    images = await bathroom.getImages();
    res.json(images)
  } catch (err) {
    next(err)
  }
})
