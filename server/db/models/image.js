const { UUID, UUIDV4, STRING } = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  imageURL: {
    type: STRING,
  },
})

module.exports = Image
