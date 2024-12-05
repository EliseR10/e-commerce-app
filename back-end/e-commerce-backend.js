/*Express set-up*/
    const express = require('express');
    const app = express();
    /*That is for PostgreSQL to link to back-end
    const { Pool } = require('pg');*/
    const PORT = 4000;
    /*To load environment variables from .env file*/
    require('dotenv').config(); 
    /*Cors request*/
    const cors = require('cors');
    /*Bcrypt to hash password before storing in database*/
    const bcrypt = require('bcrypt');
    const session = require('express-session');
    const passport = require('./passport-config');
    const pool = require('./db');
    const authRoutes = require('./auth');

/*Middleware for CORS*/
app.use(cors({
    origin: 'http://localhost:3000',
    method: 'GET, POST, PUT, DELETE',
    credentials: true, //allow cookies session
}));

/*Middleware to parse JSON*/
app.use(express.json());

/*Set up session management*/
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, //this as to be true if in production
        httpOnly: true, 
        maxAge: 30 * 60 * 1000 //session time out after 30 minutes
    },
}));

/*Initialize passport and restore session*/
app.use(passport.initialize());
app.use(passport.session());

/*Use authentication routes*/
app.use('/auth', authRoutes);

/*Middleware to protect all other routes
app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Not authenticated');
    res.redirect('/login');
});*/

/*Check what req.isAuthenticated() returns for the failing request*/
app.use((req, res, next) => {
    console.log('Is authenticated: ', req.isAuthenticated());
    next();
});


/*Writing routes*/
    /*PRODUCT DATA API ENDPOINT*/
    /*Create / Update a product details. Front-end: "validate" button from addAProduct page*/
    app.post('/product', async (req, res) => {
        const {id, name, description, price } = req.body;

        try {
            const query = `
                INSERT INTO product (id, name, description, price)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (id)
                DO UPDATE SET
                    name = EXCLUDED.name,
                    description = EXCLUDED.description,
                    price = EXCLUDED.price
                RETURNING (SELECT CASE WHEN xmax = 0 THEN 'added' ELSE 'updated' END AS action), *;
            `
            /*Here EXCLUDED is to tell Postgres that in case of conflict, these are the new values 
            added, therefore not the source of conflicts */
            
            const result = await pool.query(query, [id, name, description, price]);

            //Determine if the product was added or updated
            const action = result.rows[0].action;

            //Return the newly created/updated product
            res.json({ 
                message: `Product ${action} to the database`,
                product: result.rows[0]
            });
            console.log(`Product ${action}:`, result.rows[0]);

        } catch (err) {
            console.error('Error adding or updating this product', err);
            res.status(500).send('Server error');
        }
    });

    /*Get product details. Front-end: displaying products*/
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

    /*Get a specific product details*/
    app.get('/product/:id', async (req, res) => {
        const {id} = req.params;

        try {
            const result = await pool.query(`SELECT id, name, description, price FROM product WHERE id = $1`, [id]);
            res.json(result.rows);
            console.log(result.rows);
        } catch (err) {
            console.error('Error retrieving products', err);
            res.status(500).send('Server error');
        }
    });

    /*Delete the product*/
    app.delete('/product/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const query = `
                DELETE FROM product
                WHERE id = $1
                RETURNING *;
            `;

            const result = await pool.query(query, [id]);
                      
            res.json({ message: 'Product removed from database', id: result.rows[0] });
            /*This above is giving information to the front-end/client about 
            the product being deleted correctly*/

        } catch (err) {
            console.error('Error deleting the product', err);
            res.status(500).send('Server error');
        }
    });

    /*CART API ENDPOINT*/
    /*Adding items to Cart. Front-end: by clicking on 'Add to Cart', passing product details*/
    app.post('/cart/:customers_id', async (req, res) => {
        const { customers_id } = req.params;
        const { product_id, quantity } = req.body;

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
    

    /*ACCOUNT API ENDPOINTS*/
    /*Create an account. Front-end: register button*/
    app.post('/account', async (req, res) => {
        const { customers_username, password } = req.body;

        try {
            /*Check that input are valid*/
            if (!customers_username || !password) {
                return res.status(400).json({message: 'Username or password are required'});
            }

            if (typeof password !== 'string') {
                return res.status(400).json({message: 'Password must be a string.'});
            }

            /*Check first if the account already exist*/
            const checkAccount = `SELECT * FROM account WHERE customers_username = $1`;
            const checkAccountResult = await pool.query(checkAccount, [customers_username]);

            if (checkAccountResult.rows.length > 0) {
                return res.status(400).json({message: 'Account already exists'});
            }

            //Start a transaction
            await pool.query('BEGIN');

            /*Hash the password*/
            /*Here 10 is determining the number of hashing*/
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const query = `
                INSERT INTO account (customers_username, password, role_id)
                VALUES ($1, $2, 1)
                RETURNING customers_id, customers_username, id;
            `;

            const result = await pool.query(query, [customers_username, hashedPassword]);
            const newUser = result.rows[0];

            //save in a const the data needed to insert into customers table
            const customers_id = result.rows[0].customers_id;
            const account_id = result.rows[0].id;

            const customersQuery = `
                INSERT INTO customers (id, username, account_id)
                VALUES ($1, $2, $3)
            `;
            await pool.query(customersQuery, [customers_id, customers_username, account_id]);

            await pool.query('COMMIT'); //commit transaction

            /*Log the user in after account is created*/
            if (newUser) {
                req.login(newUser, (err) => {
                if (err) {
                    return res.status(500).json({message: 'Login failed after registration.'});
                }
                return res.json({success: true, message: 'Account created and logged in successfully'});
                
            });
            }
            console.log('Account created!');

        } catch (err) {
            console.log('Error creating a new account', err);
            res.status(500).send('Server error');
        }
    });

    /*Display account details*/
    app.get('/account/:id', async (req, res) => {
        const {id} = req.params;

        try {
                const result = await pool.query('SELECT id, customers_username, customers_phone_number FROM account WHERE id=$1',
                    [id] //pass in the id as the value of $1
                );
                res.json(result.rows);
                console.log(result.rows);
        } catch (err) {
            console.error('Error retrieving the account data', err);
            res.status(500).send('Server error');
        }
    });

    /*Update account details. Front-end: "save" button*/
    app.put('/account/:id', async (req, res) => {
        const { id } = req.params;
        const { customers_phone_number, password } = req.body;

        try {

            //Prepare the update query
            const values = []; //array to hold the values for the query
            let setClauses = []; //array to hold the SET clause of the SQL query

            if (customers_phone_number) {
                setClauses.push(`customers_phone_number = $${values.length + 1}`); //create the next placeholders like $1, useful to avoid SQL injection attacks
                values.push(customers_phone_number); //add phone number to values
            }

            if (password) {
                setClauses.push(`password = $${values.length + 1}`);
                /*Hash the password*/
                const saltRounds = 10; /*Here 10 is determining the number of hashing*/
                const hashedPassword = await bcrypt.hash(password, saltRounds); 
                values.push(hashedPassword);
            }

            //If no field provided, return an error
            if (setClauses.length === 0) {
                return res.status(400).json({ message: 'No fields provided for update.'});
            }

            const query = `
                UPDATE account
                SET ${setClauses.join(', ')}
                WHERE id = $${values.length + 1}
                RETURNING *;
            `;

            /*Add the id to the end of the values array. This ensures that SQL query 
            knows which specific record to update*/
            values.push(id);

            const result = await pool.query(query, values);

            //Check if the account was found and updated
            if (result.rows.length === 0){
                return res.status(400).json({ message: 'Account not found'});
            }

            if (customers_phone_number) {
                const customersQuery = `
                    UPDATE customers
                    SET phone_number = $1
                    WHERE id = (SELECT customers_id FROM account WHERE id = $2)
                    RETURNING *;
                `;

                const customersValues = [customers_phone_number, id];
                const customersResult = await pool.query(customersQuery, customersValues);

                if (customersResult.rows.length === 0) {
                    console.log('No matching customer found to update');
                } else {
                    console.log('Customer updated successfully: ', customersResult.rows[0]);
                }
            }

            res.json({ message: 'Account updated successfully', account: result.rows[0] });
            
        } catch (err) {
            console.error('Error updating the account', err);
            res.status(500).json({error: err.message});
        };
    });
    
    /*Delete account details. Front-end: "delete account" button*/
    app.delete('/account/:id', async(req, res) => {
        const { id } = req.params;
    
        try {
            const query = `
                DELETE FROM account
                WHERE id = $1
                RETURNING *;
            `;
    
            const result = await pool.query(query, [id]);
                          
            res.json({ message: 'Account deleted successfully', id: result.rows[0] });
            /*This above is giving information to the front-end/client about 
            the account being deleted correctly*/
    
        } catch (err) {
            console.error('Error deleting the account', err);
            res.status(500).send('Server error');
        }
    });
    

    /*ORDER API ENDPOINTS*/
    /*Display orders. Front-end: account page*/
    /*Below in my Select:    
        MAX ensures one order date per orders.id
        SUM keeps the total amount as it is
        COUNT counts the total number of products in the order*/
    app.get('/orders/:customers_id', async (req, res) => {
        const { customers_id } = req.params;

        try {
            const query = `
            SELECT 
                orders.id AS orders_id, 
                MAX(orders.order_date) AS order_date, 
                SUM(orders.total_order_amount) AS total_order_amount, 
                COUNT(order_items.product_id) AS total_amount_products 
            FROM 
                orders 
            JOIN 
                order_items 
            ON 
                orders.id = order_items.orders_id
            WHERE
                orders.customers_id = $1
            GROUP BY 
                orders.id
            ORDER BY
                orders.id DESC
            LIMIT 3;
            `;

            const result = await pool.query(query, [customers_id]);
            res.json(result.rows);
            console.log(result.rows);

        } catch (err) {
            console.error('Error retrieving orders', err);
            res.status(500).send('Server error');
        }
    });

    /*Create the order and save cart items + empty cart. Front-end: "Order Now" */
    app.post('/orders/:customers_id', async (req, res) => {
        const { customers_id } = req.params;

        try {
            //Begin the transaction for consistency
            await pool.query('BEGIN');

            //Get the cart item for the customers
            const cartQuery = `
                SELECT c.product_id, c.quantity, p.price
                FROM cart c
                JOIN product p on c.product_id = p.id
                WHERE c.customers_id = $1;
            `;

            const cartResult = await pool.query(cartQuery, [customers_id]);

            if (cartResult.rows.length === 0) {
                return res.status(400).json({ message: 'Cart is empty.'});
            }

            //Calculate the total order amount
            const totalAmount = cartResult.rows.reduce((sum, item) => sum + item.quantity * item.price, 0);

            //Insert the new order into the orders table
            const orderQuery = `
                INSERT INTO orders (customers_id, order_date, total_order_amount)
                VALUES ($1, NOW(), $2)
                RETURNING id;
            `;

            //Insert the order and retrieve the generated orders_id
            const orderResult = await pool.query(orderQuery, [customers_id, totalAmount]);
            const orders_id = orderResult.rows[0].id;

            //Now insert each item of the cart into the order_items table
            const orderItemsQuery = `
                    INSERT INTO order_items (product_id, quantity, product_price, orders_id)
                    VALUES ($1, $2, $3, $4);
                `;

            for (const item of cartResult.rows) {
                await pool.query(orderItemsQuery, [
                    item.product_id,
                    item.quantity, 
                    item.price,
                    orders_id ]);
            }

            //Clear the cart after placing the order
            await pool.query('DELETE FROM cart WHERE customers_id = $1', [customers_id]);

            //Commit the transaction
            await pool.query('COMMIT');

            res.json({ message: 'Order placed successfully', orders_id, totalAmount });
            console.log('Order placed successfully! Thank you!');
        } catch (err) {
            //Rollback in case of error
            console.error('Error placing your order:', err);
            res.status(500).send('Server error');
        }
    });

    /*Update orders (quantity). Front-end: button to define*/
    app.put('/orders/:customers_id', async (req, res) => {
        const { customers_id } = req.params;
        const { quantity } = req.body;

        try {
            const query = `
                UPDATE order_items
                SET quantity = $1
                WHERE orders_id IN (
                    SELECT id FROM orders WHERE customers_id = $2
                )
                RETURNING *;
            `
            const result = await pool.query(query, [quantity, customers_id]);

            res.json({ message: 'Your order was amended', order_items: result.rows[0] });
            console.log(result.rows[0]);

        } catch (err) {
            console.error('Error updating this order', err);
            res.status(500).send('Server error');
        }
    });

    /*Delete orders. Front-end: button to define*/
    app.delete('/orders/:id', async(req, res) => {
        const { id } = req.params;
    
        try {
            const query = `
                DELETE FROM orders
                WHERE id = $1
                RETURNING *;
            `;
    
            const result = await pool.query(query, [id]);
                          
            res.json({ message: 'Order deleted successfully', orders: result.rows[0] });
    
        } catch (err) {
            console.error('Error deleting the order', err);
            res.status(500).send('Server error');
        }
    });

    /*Starting a server*/
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    });

    //module.exports = pool;
