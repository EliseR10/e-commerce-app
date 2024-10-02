/*Express set-up*/
    const express = require('express');
    const app = express();
    /*That is for PostgreSQL to link to back-end*/
    const { Pool } = require('pg');
    const PORT = 4000;
    /*To load environment variables from .env file*/
    require('dotenv').config(); 

/*Connect to database*/
const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432
});

//Test the connection
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err);
    } else {
        console.log('Connected to the PostgreSQL database');
    }
});

/*Writing routes*/
    /*Middleware to parse JSON*/
    app.use(express.json());

    /*Products data*/
    /*Endpoint to get product names*/
    app.get('/product', async (req, res) => {
        try {
            const result = await pool.query('SELECT name FROM product');
            res.json(result.rows);
            console.log(result.rows);
        } catch (err) {
            console.error('Error retrieving products', err);
            res.status(500).send('Server error');
        }
    });

    /*Endpoint to get product id*/
    app.get('/product_id', async (req, res) => {
        console.log('Request received for /product_id.')
        try {
            const result = await pool.query('SELECT id FROM product');
            res.json(result.rows);
            console.log(result.rows);
        } catch (err) {
            console.error('Error retrieving product IDs:', err);
            res.status(500).send('Server error');
        }
    });

/*Starting a server*/
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    });

