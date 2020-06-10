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
