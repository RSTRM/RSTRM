const { UUID, UUIDV4, STRING } = require('sequelize')
const db = require('../db')

const BadgeCriteria = db.define('badgeCriteria', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
})

module.exports = BadgeCriteria
