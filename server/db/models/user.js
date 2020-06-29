const crypto = require('crypto')
const { UUID, UUIDV4, STRING, BOOLEAN, INTEGER, TEXT, Op } = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  username: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  nameFirst: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  nameLast: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: STRING
  },
  admin: {
    type: BOOLEAN,
    defaultValue: false
  },
  totalCheckins: {
    type: INTEGER,
    defaultValue: 0
  },
  totalReviews: {
    type: INTEGER,
    defaultValue: 0
  },
  imageURL: {
    type: TEXT
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.prototype.getBadges = async function () {
  const badges = await db.models.userBadge.findAll({
    where: { userId: this.id },
    order: [['createdAt', 'DESC']],
    include: [{ model: db.models.badge }]
  })
  return badges
}

User.prototype.getReviews = async function (daysWithin) {
  let reviews
  if (daysWithin) {
    const date = new Date()
    date.setDate(date.getDate() - daysWithin)
    reviews = await db.models.review.findAll({
      where: { userId: this.id, createdAt: { [Op.gte]: date } },
      order: [['createdAt', 'DESC']],
      include: [{ model: db.models.bathroom }]
    })
  } else {
    reviews = await db.models.review.findAll({
      where: { userId: this.id },
      order: [['createdAt', 'DESC']],
      include: [{ model: db.models.bathroom }]
    })
  }
  return reviews
}

User.prototype.getCheckins = async function (daysWithin) {
  let checkins
  if (daysWithin) {
    const date = new Date()
    date.setDate(date.getDate() - daysWithin)
    checkins = await db.models.checkin.findAll({
      where: { userId: this.id, createdAt: { [Op.gte]: date } },
      order: [['createdAt', 'DESC']],
      include: [{ model: db.models.bathroom }]
    })
  } else {
    checkins = db.models.checkin.findAll({
      where: { userId: this.id },
      order: [['createdAt', 'DESC']],
      include: [{ model: db.models.bathroom }]
    })
  }
  return checkins
}

User.prototype.updateUserCheckinBadges = async function () {
  try {
    const userBadges = await db.models.userBadge.findAll({
      where: { userId: this.id }
    })
    const userBadgeIds = userBadges.map(badge => badge.badgeId)
    const badges = await db.models.badge.findAll({
      where: {
        id: { [Op.notIn]: userBadgeIds },
        table: 'user',
        formula: { [Op.startsWith]: 'total' }
      }
    })

    badges.forEach(async badge => {
      const critera = 'this' + '.' + badge.formula
      if (eval(critera)) {
        await db.models.userBadge.create({
          userId: this.id,
          badgeId: badge.id
        })
      }
    })
  } catch (ex) {
    console.log(ex)
  }
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
User.afterCreate(async function (user) {
  const badge = await db.models.badge.findOne({ where: { name: 'welcome' } })
  await db.models.userBadge.create({
    userId: user.id,
    badgeId: badge.id
  })
})

User.afterUpdate(async function (user) {
  await user.updateUserCheckinBadges()
})
