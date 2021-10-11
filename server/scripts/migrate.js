require('dotenv').config()
const db = require('../db')

db.initialise().then(() => {
  console.log('Database migration completed')
  process.exit()
}).catch((err) => {
  console.log(err)
  console.log('Database migration failed')
  process.exit(1)
})