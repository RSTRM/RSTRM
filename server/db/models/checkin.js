const { UUID, UUIDV4, DATE } = require('sequelize')
const db = require('../db')

const Checkin = db.define('checkin', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  checkinDate: {
    type: DATE,
    defaultValue: DATE.now,
  },
})

module.exports = Checkin

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */

Checkin.afterCreate(async function (checkin) {
  const user = await db.models.user.findByPk(checkin.userId)
  // console.log(user.id, ' - ', user.totalCheckins)
  const totalCheckins = user.totalCheckins + 1
  // console.log(totalCheckins)
  const updatedUser = await user.update({ totalCheckins })
  // console.log(updatedUser._changed)
})
