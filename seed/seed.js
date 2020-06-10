'use strict'

const db = require('../server/db')

const {
  Bathroom,
  Checkin,
  Image,
  Review,
  User,
} = require('../server/db/models')

const refugeArray = require('./refugeData')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const filtered = refugeArray.filter(
    (item) => !item.updated_at.includes('2020-04-14T21') && !!item.name
  )
  console.log(`kept ${filtered.length} items of ${refugeArray.length}`)

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
