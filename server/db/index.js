const { Pool } = require('pg')
const fs = require('fs')

const User = require('../models/user');
const UserDetails = require('../models/userDetails');


let pool;

if (process.env.MYHEROKU === "true") {
  // Heroku enviroment
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      require: true,
      rejectUnauthorized: false,
      ca: fs.readFileSync(`${__dirname}/global-bundle.pem`)
    }
  })
} else {
  // local environment 
  // pool = new Pool({connectionString: process.env.DATABASE_URL})
  // console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`)

  pool = new Pool({
    pgUser: process.env.PGUSER,
    pgHost: process.env.PGHOST,
    pgDatabase: process.env.PGDATABASE,
    pgPassword: process.env.PGPASSWORD,
    pgPort: process.env.PGPORT
  })

  // console.debug(pool)
}


const db = {
  ...require('./users')(pool, User),
  ...require('./userDetails')(pool, UserDetails)
}

db.initialise = async () => {

  // delete all tables
  // for development purpose
  await pool.query(`
      DROP TABLE IF EXISTS user_details;
      DROP TABLE IF EXISTS users;
    `)

  await pool.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id SERIAL         PRIMARY KEY,
        username          VARCHAR(100) NOT NULL,
        email             VARCHAR(50) NOT NULL,
        password_hash     VARCHAR(100) NOT NULL,
        create_at         DATE NOT NULL DEFAULT CURRENT_DATE
      )
    `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS User_details (
      id SERIAL         PRIMARY KEY,
      user_id           INTEGER NOT NULL,
      company           VARCHAR(100) NOT NULL,
      designation       VARCHAR(100) NOT NULL,
      department        VARCHAR(100) NOT NULL,
      create_at         DATE NOT NULL DEFAULT CURRENT_DATE,
      FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
    )
  `)


  db.clearUsersTables = async () => {
    await pool.query('DELETE FROM Users')
    await pool.query('ALTER SEQUENCE users_id_seq RESTART')
  }
  db.clearUserDetailsTables = async () => {
    await pool.query('DELETE FROM User_details')
    await pool.query('ALTER SEQUENCE user_details_id_seq RESTART')
  }


  db.end = async () => {
    await pool.end()
  }

}

module.exports = db