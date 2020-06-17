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

const refugeArray = require('./refugeData')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  //clean refuge data
  const filtered = []
  const map = new Map()

  for (const item of refugeArray) {
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
  console.log(`kept ${filtered.length} bathrooms of ${refugeArray.length}`)

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

  const badgesInfo = [
    {
      name: 'welcome',
      nameDisplay: 'Welcome to RSTRM',
      table: 'user',
      formula: 'user exists',
    },
    {
      name: 'firstCheckin',
      nameDisplay: 'First Check-in',
      table: 'checkin',
      formula: 'checkins = 1',
    },
    {
      name: 'firstReview',
      nameDisplay: 'First Review',
      table: 'review',
      formula: 'reviews = 1',
    },
    {
      name: 'newYork',
      nameDisplay: "Answering Nature's Call in New York",
      table: 'checkin',
      formula: 'checkin.state = NY',
    },
    {
      name: 'colorado',
      nameDisplay: 'Seeking the Commode in Colorado',
      table: 'checkin',
      formula: 'checkin.state = CO',
    },
    {
      name: 'ohio',
      nameDisplay: 'Checking Out the Outhouse in Ohio',
      table: 'checkin',
      formula: 'checkin.state = OH',
    },
  ]

  const badges = await Promise.all(
    badgesInfo.map((badge) => {
      const { name, nameDisplay, table, formula } = badge
      return Badge.create({ name, nameDisplay, table, formula })
    })
  )
  console.log(`seeded ${badges.length} badges sucessfully`)

  const people = [
    { nameFirst: 'Katt', nameLast: 'Baum' },
    { nameFirst: 'Denis', nameLast: 'McPhillips' },
    { nameFirst: 'Valmik', nameLast: 'Vyas' },
    { nameFirst: 'Yeung', nameLast: 'Lo' },
  ]

  //USERS
  const users = await Promise.all(
    people.map((person) => {
      const { nameFirst, nameLast } = person
      const username = nameFirst[0].toLowerCase() + nameLast.toLowerCase()
      const email = username + '@email.com'
      return User.create({
        username,
        nameFirst,
        nameLast,
        email,
        password: '123',
        admin: true,
      })
    })
  )

  console.log(`seeded ${users.length} users sucessfully`)

  //CHECKINS
  const createCheckins = () => {
    const checkinsPerUser = new Array(users.length)
      .fill(1)
      .map((num) => (num = Math.floor(Math.random() * 10)))
    const checkinArr = []
    users.forEach((user, idx) => {
      for (let i = 0; i < checkinsPerUser[idx]; i++) {
        const randBathoom =
          bathrooms[Math.floor(Math.random() * bathrooms.length)]
        const today = new Date()
        checkinArr.push(
          Checkin.create({
            userId: user.id,
            bathroomId: randBathoom.id,
            checkinDate: today.setDate(
              today.getDate() - Math.floor(Math.random() * 30)
            ),
          })
        )
      }
    })
    return checkinArr
  }

  const checkins = await Promise.all(createCheckins())

  console.log(`seeded ${checkins.length} checkins sucessfully`)

  //REVIEWS
  const randComments = [
    'This bathroom is horrible.',
    'I probably would not use this bathroom again if I could help it.',
    'Usable...',
    'Decent!',
    'Excellent! Clean and beautiful.',
  ]

  const reviews = await Promise.all(
    checkins.reduce((acc, checkin, idx) => {
      if (idx % 2 === 0) {
        const rand = Math.floor(Math.random() * 5)
        acc.push(
          Review.create({
            rating: rand + 1,
            comments: randComments[rand],
            userId: checkin.userId,
            bathroomId: checkin.bathroomId,
            checkinId: checkin.id,
          })
        )
      }
      return acc
    }, [])
  )

  console.log(`seeded ${reviews.length} reviews sucessfully`)

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
