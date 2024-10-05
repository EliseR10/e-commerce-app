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

    /*PRODUCT DATA API ENDPOINT*/
    /*Endpoint to get product details. Front-end: displaying products*/
    app.get('/product', async (req, res) => {
        try {
            const result = await pool.query('SELECT id, name, description, price FROM product');
            res.json(result.rows);
            console.log(result.rows);
        } catch (err) {
            console.error('Error retrieving products', err);
            res.status(500).send('Server error');
        }
    });

    /*CART API ENDPOINT*/
    /*Adding items to Cart. Front-end: by clicking on 'Add to Cart', passing product details*/
    app.post('/cart', async (req, res) => {
        const { customers_id, product_id, quantity } = req.body;

        try {
            const query = `
                INSERT INTO cart (customers_id, product_id, quantity)
                VALUES ($1, $2, $3)
                ON CONFLICT (customers_id, product_id) DO UPDATE
                SET quantity = cart.quantity + $3
                RETURNING *;
            `;
        
            const result = await pool.query(query, [customers_id, product_id, quantity]);
            res.json(result.rows[0]);
            console.log('The items has been added to the cart');
        } catch (err) {
            console.error('Error adding item to cart', err);
            res.status(500).send('Server error');
        }
    })

    /*Display cart. Front-end: cart appearing when you click on button cart.*/
    app.get('/cart/:customers_id', async (req, res) => {
        const { customers_id } = req.params;

        try {
            const query = `
                SELECT
                    c.customers_id,
                    c.product_id,
                    p.name,
                    p.price,
                    c.quantity,
                    (p.price * c.quantity) AS total_per_product
                FROM 
                    cart c
                JOIN 
                    product p ON c.product_id = p.id
                WHERE
                    c.customers_id = $1;    
            `;

            const result = await pool.query(query, [customers_id]);
            
            const cartItems = result.rows;

            //Calculate total cart value
            const totalCartValue = cartItems.reduce((sum, item) => sum + item.total_per_product, 0);

            //Return the cart items along with the total cart value
            res.json({ cartItems, totalCartValue });
        
        } catch (err) {
            console.error('Error retrieving cart', err);
            res.status(500).send('Server error');
        }
    });

    /*Updating cart. Front-end: numbers to go up and down.*/
    app.put('/cart/:customers_id/:product_id', async (req, res) => {
        const { customers_id, product_id } = req.params;
        const { quantity } = req.body;

        console.log(`Updating cart for customer ${customers_id}, product ${product_id}, with quantity ${quantity}`);
        try {
            const query = `
                UPDATE cart
                SET quantity = $1
                WHERE product_id =$2
                RETURNING *;
            `;

            const result = await pool.query(query, [quantity, product_id]);
            res.json(result.rows[0]);
            
        } catch (err) {
            console.error('Error updating the cart item quantity', err);
            res.status(500).send('Server error');
        };
    });

    /*Deleting an item from cart. Front-end: press the button bin*/
    app.delete('/cart/:customers_id/:product_id', async (req, res) => {
        const { customers_id, product_id } = req.params;

        try {
            const query = `
                DELETE FROM cart
                WHERE customers_id = $1 AND product_id = $2
                RETURNING *;
            `;

            const result = await pool.query(query, [customers_id, product_id]);
            
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Item not found in the cart'});
            }
            
            res.json({ message: 'Item removed from cart', item: result.rows[0] });
            /*This above is giving information to the front-end/client about 
            the items being deleted correctly and which items*/

        } catch (err) {
            console.error('Error deleting the cart item', err);
            res.status(500).send('Server error');
        }
    });
            
/*Starting a server*/
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    });

