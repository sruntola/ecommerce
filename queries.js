const Pool = require('pg').Pool
// const pool = new Pool({
//     user: 'tshare_user',
//     host: 'dpg-cha81nak728r885gpfrg-a',
//     database: 'tshare',
//     password: '1nrBSb14GAjyz42tOfCaVurB7FpQcN8g',
//     port: 5432,
// })

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'tsharedatabase',
    password: 'password',
    port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers
}