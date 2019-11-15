var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require("../models/user")
var middleware = require("../middleware")

//===========================
// ROUTES
//===============

router.get("/", function(req, res){
    res.render("landing")
})



//=======================================
//  AUTH ROUTES
//==========================================
router.get('/register', function(req, res){
    res.render('register')
})
//signup logic
router.post('/register', function(req, res){
    var newUser = new User ({username : req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message)
            return res.redirect('register')
        }
        passport.authenticate('local')(req, res, function(){
            req.flash("success", "welcome to the Yelpcamp" + user.username)
            res.redirect('/campgrounds')
        })
    })
})
//=============================login routes==============================
router.get('/login', function(req, res){
    res.render('login');
})

router.post('/login', passport.authenticate("local",{
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res){
})
//===============================logout===============================
router.get('/logout', function(req, res){
    req.logOut();
    req.flash("success", "Logged You Out")
    res.redirect('/campgrounds')
})



module.exports = router