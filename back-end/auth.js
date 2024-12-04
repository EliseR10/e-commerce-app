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
        return res.json({success: true, message: 'Login successful'});
    });
    })(req, res, next); //call the function
});

/*Logging out*/
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect("/login");
    });
    
})

module.exports = router;