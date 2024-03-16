/* eslint-disable no-tabs */
/* eslint-disable indent */
const { Client } = require('pg')

const db = new Client({
	host: 'localhost',
	user: 'postgres',
	port: 5432,
	password: '0303',
	database: 'postgres'
})

// koneksi db
// db.connect()

console.log(db.connect())

module.exports = { db }
