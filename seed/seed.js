'use strict'

const db = require('../server/db')

const {
  Bathroom,
  Checkin,
  Image,
  Review,
  User,
  Badge,
  UserBadge,
} = require('../server/db/models')

const seedData = require('./seedData')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  //clean refuge data
  const filtered = []
  const map = new Map()

  for (const item of seedData.bathroomInfo) {
    if (
      //filter duplicate items
      !map.has(item.id) &&
      //filter erroneous items
      !item.updated_at.includes('2020-04-14T21') &&
      //filter nameless items
      !!item.name
    ) {
      map.set(item.id, true)
      filtered.push(item)
    }
  }
  console.log(
    `kept ${filtered.length} bathrooms of ${seedData.bathroomInfo.length}`
  )

  //BATHROOMS
  const bathrooms = await Promise.all(
    filtered.map((item) => {
      return Bathroom.create({
        refugeId: item.id,
        unisex: item.unisex,
        accessible: item.accessible,
        changingTable: item.changing_table,
        directions: item.directions,
        establishment: item.name,
        street: item.street,
        city: item.city,
        state: item.state,
        country: item.country,
        latitude: item.latitude,
        longitude: item.longitude,
      })
    })
  )

  console.log(`seeded ${bathrooms.length} bathrooms sucessfully`)

  const badgesInfo = seedData.badgesInfo

  const badges = await Promise.all(
    badgesInfo.map((badge) => {
      return Badge.create(badge)
    })
  )
  console.log(`seeded ${badges.length} badges sucessfully`)

  //USERS
  const users = await Promise.all(
    seedData.usersInfo.map((person) => {
      const { nameFirst, nameLast, admin } = person
      const username = nameFirst[0].toLowerCase() + nameLast.toLowerCase()
      const email = username + '@email.com'
      return User.create({
        username,
        nameFirst,
        nameLast,
        email,
        password: '123',
        admin,
      })
    })
  )

  console.log(`seeded ${users.length} users sucessfully`)

  const adminUsers = users.filter((user) => user.admin)
  const regUsers = users.filter((user) => !user.admin)

  //utility function will create data in sequence. this is needed because postgres is multi-threaded
  const runInSequence = async (data, model) => {
    let results = []
    let chain = Promise.resolve()
    data.forEach((d) => {
      chain = chain.then(async () => {
        let result = await model.create(d)
        results.push(result)
      })
    })
    await chain
    return results
  }

  //CHECKINS
  const createAdminCheckins = () => {
    const checkinsPerUser = new Array(adminUsers.length)
      .fill(1)
      .map((num) => (num = Math.floor(Math.random() * 10)))
    const checkinArr = []
    adminUsers.forEach((user, idx) => {
      for (let i = 0; i < checkinsPerUser[idx]; i++) {
        const randBathoom =
          bathrooms[Math.floor(Math.random() * bathrooms.length)]
        const today = new Date()
        checkinArr.push({
          userId: user.id,
          bathroomId: randBathoom.id,
          checkinDate: today.setDate(
            today.getDate() - Math.floor(Math.random() * 30)
          ),
        })
      }
    })
    return checkinArr
  }

  const adminCheckins = await runInSequence(createAdminCheckins(), Checkin)

  console.log(`seeded ${adminCheckins.length} admin checkins sucessfully`)

  const _checkins = bathrooms.map((bathroom) => {
    const randUser = regUsers[Math.floor(Math.random() * regUsers.length)]
    const today = new Date()
    return {
      bathroomId: bathroom.id,
      userId: randUser.id,
      checkinDate: today.setDate(
        today.getDate() - Math.floor(Math.random() * 30)
      ),
    }
  })

  const checkins = await runInSequence(_checkins, Checkin)

  console.log(`seeded ${checkins.length} regular checkins sucessfully`)

  //REVIEWS
  const randComments = [
    'This bathroom is horrible.',
    'I probably would not use this bathroom again if I could help it.',
    'Usable...',
    'Decent!',
    'Excellent! Clean and beautiful.',
  ]

  const _adminReviews = adminCheckins.reduce((acc, checkin, idx) => {
    if (idx % 2 === 0) {
      const rand = Math.floor(Math.random() * 5)
      acc.push({
        rating: rand + 1,
        comments: randComments[rand],
        userId: checkin.userId,
        bathroomId: checkin.bathroomId,
        checkinId: checkin.id,
      })
    }
    return acc
  }, [])

  const adminReviews = await runInSequence(_adminReviews, Review)

  console.log(`seeded ${adminReviews.length} admin reviews sucessfully`)

  const moreRandComments = [
    'Never. Again.',
    "User only if you're desperate!",
    'Great in a pinch',
    'Solid choice for all your restoroom needs.',
    'I want to live in this bathroom!',
  ]

  const _reviews = checkins.map((checkin) => {
    const rand = Math.floor(Math.random() * 5)
    return {
      rating: rand + 1,
      comments: moreRandComments[rand],
      userId: checkin.userId,
      bathroomId: checkin.bathroomId,
      checkinId: checkin.id,
    }
  })

  const reviews = await runInSequence(_reviews, Review)

  console.log(`seeded ${reviews.length} regular reviews sucessfully`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
