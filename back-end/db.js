/*That is for PostgreSQL to link to back-end*/
const { Pool } = require('pg');

/*Connect to database*/
const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432
});

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err);
    } else {
        console.log('Connected to the PostgreSQL database');
    }
});

module.exports = pool;