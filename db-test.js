const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'petshop',
    password: '112358',
    port: 5432,
})

// pool.query('SELECT * FROM pet', (err, res) => {
//     console.log(err, res)
//     pool.end()
// })


const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'petshop',
    password: '112358',
    port: 5432,
})

// client.connect()
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

module.exports = pool, client;