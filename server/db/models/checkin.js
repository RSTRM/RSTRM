const { UUID, UUIDV4, DATE, Op } = require('sequelize')
const db = require('../db')
const { find } = require('../../../seed/refugeData')

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

Checkin.prototype.updateUserStateBadges = async function () {
  try {
    const bathroom = await db.models.bathroom.findByPk(this.bathroomId)
    const userBadges = await db.models.userBadge.findAll({
      where: { userId: this.userId },
    })
    const userBadgeIds = userBadges.map((badge) => badge.badgeId)
    const badges = await db.models.badge.findAll({
      where: {
        id: { [Op.notIn]: userBadgeIds },
        table: 'bathroom',
        formula: { [Op.startsWith]: 'state' },
      },
    })

    badges.forEach(async (badge) => {
      const critera = badge.table + '.' + badge.formula
      if (eval(critera)) {
        await db.models.userBadge.create({
          userId: this.userId,
          badgeId: badge.id,
        })
      }
    })
  } catch (ex) {
    console.log(ex)
  }
}

/**
 * hooks
 */

Checkin.afterCreate(async function (checkin) {
  const user = await db.models.user.findByPk(checkin.userId)
  user.totalCheckins++
  const updatedUser = await user.save()
  await checkin.updateUserStateBadges()
})
