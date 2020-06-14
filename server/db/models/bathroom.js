const {
  UUID,
  UUIDV4,
  STRING,
  TEXT,
  INTEGER,
  BOOLEAN,
  FLOAT,
  Op,
} = require('sequelize')
const db = require('../db')

const Bathroom = db.define('bathroom', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  refugeId: {
    type: INTEGER,
    unique: true,
  },
  unisex: {
    type: BOOLEAN,
  },
  accessible: {
    type: BOOLEAN,
  },
  changingTable: {
    type: BOOLEAN,
  },
  directions: {
    type: TEXT,
  },
  AvgRating: {
    type: INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  },
  checkinCount: {
    type: INTEGER,
  },
  establishment: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  street: {
    type: STRING,
  },
  city: {
    type: STRING,
  },
  state: {
    type: STRING,
  },
  country: {
    type: STRING,
  },
  latitude: {
    type: FLOAT,
  },
  longitude: {
    type: FLOAT,
  },
  website: {
    type: STRING,
  },
})

/**
 * instanceMethods
 */

Bathroom.prototype.getReviews = async function (daysWithin) {
  if (daysWithin) {
    const date = new Date()
    date.setDate(date.getDate() - daysWithin)
    return db.models.review.findAll({
      where: { bathroomId: this.id, createdAt: { [Op.gte]: date } },
      order: [['createdAt', 'DESC']],
    })
  }
  return db.models.review.findAll({
    where: { bathroomId: this.id },
    order: [['createdAt', 'DESC']],
  })
}

Bathroom.prototype.getAvgRating = async function () {
  const reviews = await this.getReviews()
  const allRatings = reviews.reduce((acc, curr) => {
    return acc + curr.rating
  }, 0)
  return Math.floor(allRatings / reviews.length)
}

Bathroom.prototype.getCheckins = async function (daysWithin) {
  if (daysWithin) {
    const date = new Date()
    date.setDate(date.getDate() - daysWithin)
    return db.models.checkin.findAll({
      where: { bathroomId: this.id, createdAt: { [Op.gte]: date } },
      order: [['createdAt', 'DESC']],
    })
  }
  return db.models.checkin.findAll({
    where: { bathroomId: this.id },
    order: [['createdAt', 'DESC']],
  })
}

/**
 * classMethods
 */

/**
 * hooks
 */
module.exports = Bathroom
