const {
  UUID,
  UUIDV4,
  STRING,
  TEXT,
  INTEGER,
  BOOLEAN,
  FLOAT,
  Op
} = require('sequelize')
const db = require('../db')

const Bathroom = db.define('bathroom', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  refugeId: {
    type: INTEGER,
    unique: true
  },
  unisex: {
    type: BOOLEAN
  },
  accessible: {
    type: BOOLEAN
  },
  changingTable: {
    type: BOOLEAN
  },
  directions: {
    type: TEXT
  },
  avgRating: {
    type: INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  checkinCount: {
    type: INTEGER
  },
  establishment: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  street: {
    type: STRING
  },
  city: {
    type: STRING
  },
  state: {
    type: STRING
  },
  country: {
    type: STRING
  },
  latitude: {
    type: FLOAT
  },
  longitude: {
    type: FLOAT
  },
  website: {
    type: STRING
  }
})

/**
 * instanceMethods
 */

Bathroom.prototype.getReviews = async function (daysWithin = null) {
  let reviews
  if (daysWithin) {
    const date = new Date()
    date.setDate(date.getDate() - daysWithin)
    reviews = await db.models.review.findAll({
      where: { bathroomId: this.id, createdAt: { [Op.gte]: date } },
      order: [['createdAt', 'DESC']]
    })
  } else {
    reviews = await db.models.review.findAll({
      where: { bathroomId: this.id },
      order: [['createdAt', 'DESC']]
    })
  }
  return reviews
}

Bathroom.prototype.getAvgRating = async function () {
  try {
    let allRatings
    const reviews = await this.getReviews()
    if (reviews.length < 1) {
      allRatings = reviews.reduce((acc, curr) => {
        return acc.rating + curr.rating
      })
    } else {
      allRatings = reviews[0].rating
    }
    const _avgRating = Math.floor(allRatings / reviews.length)
    this.avgRating = _avgRating
    await this.save()
  } catch (ex) {
    console.log(ex)
  }
}

Bathroom.prototype.getCheckins = async function (daysWithin) {
  let checkins
  if (daysWithin) {
    const date = new Date()
    date.setDate(date.getDate() - daysWithin)
    checkins = await db.models.checkin.findAll({
      where: { bathroomId: this.id, createdAt: { [Op.gte]: date } },
      order: [['createdAt', 'DESC']]
    })
  } else {
    checkins = await db.models.checkin.findAll({
      where: { bathroomId: this.id },
      order: [['createdAt', 'DESC']]
    })
  }
  return checkins
}

/**
 * classMethods
 */

/**
 * hooks
 */
module.exports = Bathroom
