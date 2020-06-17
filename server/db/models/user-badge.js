const { UUID, UUIDV4, STRING } = require('sequelize')
const db = require('../db')

const UserBadge = db.define('userBadge', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
})

module.exports = UserBadge
