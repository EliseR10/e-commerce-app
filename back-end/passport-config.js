/*Package Import*/
const passport = require("passport");
//Importing the passport-local package with its Strategy instance to authenticate users with a username and a password
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
//const pool = require('./e-commerce-backend'); //import your database connection
const pool = require('./db');

/*Passport Local Strategy setup. Without this setup, Passport wouldn't know how to authenticate users with a local strategy.*/
passport.use(new LocalStrategy({usernameField: "customers_username", passwordField: "password"},
    async (customers_username, password, done) => {
        try {
            /*Find the user in the database*/
            console.log('Attempting login with: ', customers_username, password);
            const query = 'SELECT * FROM account WHERE customers_username = $1';
            const result = await pool.query(query, [customers_username]);

            if (result.rows.length === 0) {
                console.log(`User not found for username: ${customers_username}`);
                return done(null, false, {message: 'Invalid credentials'});
            }

            const user = result.rows[0];

            /*Compare the password with the hashed password stored*/
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, {message: 'Invalid credentials'});
            }

            return done(null, user);

        } catch(err) {
            return done(err);
        }
    }
));


/*Serialize the user into the session*/
passport.serializeUser((user, done) => {
    console.log('Serializing user: ', user);
    const sessionData = JSON.stringify({customers_id: user.customers_id, id: user.id, role_id: user.role_id});
    done(null, sessionData);
    console.log('Serialized user: ', user);
});

/*Deserialize the user from the session*/
passport.deserializeUser(async (sessionData, done) => {
    try {
        const {customers_id, id, role_id} = JSON.parse(sessionData);

        console.log('Deserializing user with customers_id, id, role_id: ', customers_id, id, role_id);

        const query = 'SELECT customers_id, customers_username FROM account WHERE customers_id = $1';
        const result = await pool.query(query, [customers_id]);

        if (result.rows.length > 0){
            done(null, {...result.rows[0], id, role_id}); //attach customers_id and id info to req.user
        } else {
            done(null, false); //no user found
        }

    } catch(err) {
        console.log('Error in deserializing user: ', err);
        done(err);
    }
});

module.exports = passport;