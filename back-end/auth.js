/*Package Import*/
const express = require('express');
const passport = require("passport");
const router = express.Router();

/*Registration route*/
/*Logging in*/
router.post('/login', (req, res, next) => {
    console.log('Login route hit.');
    passport.authenticate('local', (err, user, info) => {

    if (err) return next(err);

    if (!user) {
        return res.status(401).json({ message: 'The credentials are invalid.'});
    }

    req.logIn(user, (err) => {
        if (err) return next(err);

        //extract relevant data from the user object
        const {customers_id, id, role_id} = user;

        return res.json({
            success: true, 
            message: 'Login successful', 
            isAuthenticated: true,
            user: {
                customers_id, 
                id, 
                role_id
            }
        });
    });
    })(req, res, next); //call the function
});

/*Logging out*/
router.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({message: 'Error logging out'});
        }

        //clear cookie once logged out
        res.clearCookie('connect.sid', {path: '/'});
        
        return res.json({
            success: true,
            message: 'Logged out successfully',
            isAuthenticated: false,
        });
    });
    
})

module.exports = router;