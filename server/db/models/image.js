const { UUID, UUIDV4, TEXT } = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  imageURL: {
    type: TEXT
  }
})

module.exports = Image
