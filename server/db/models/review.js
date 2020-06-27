const { UUID, UUIDV4, STRING, INTEGER } = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  rating: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
      notEmpty: true,
    },
  },
  comments: {
    type: STRING,
    allowNull: false,
    validate: {
      len: [4, 1000],
      notEmpty: true,
    },
  },
})

module.exports = Review

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */

Review.afterCreate(async function (review) {
  const user = await db.models.user.findByPk(review.userId)
  user.totalReviews++
  await user.save()
  const bathroom = await db.models.bathroom.findByPk(review.bathroomId)
  await bathroom.getAvgRating()
})
