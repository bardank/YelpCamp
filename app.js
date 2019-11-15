var express =  require("express"),
    app = express(),
    PORT =  process.env.PORT || 300,
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    Campground =require("./models/campground"),
    Comment = require("./models/comments"),
    User = require('./models/user'),
    seedb = require("./seeds")

var campgroundRoutes = require('./routes/campground'),
    commentRoutes    = require('./routes/comments'),
    indexRoutes       = require('./routes/index')



mongoose.connect("mongodb+srv://bardan:bardan@yelpcamp-h2yci.mongodb.net/test?retryWrites=true&w=majoritymongodb+srv://bardan:<password>@yelpcamp-h2yci.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false} )



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(express.static(__dirname +"/public"))
app.use(methodOverride('_method'))
app.use(flash())
// seedb();   // seeding db

// PASSSWORD AUTHENTICATION
app.use(require('express-session')({
    secret : 'I am the superman',
    resave : false ,
    saveUninitialized : false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})

//==========================Routes==============
app.use(indexRoutes)
app.use('/campgrounds',campgroundRoutes)
app.use('/campgrounds/:id/comments',commentRoutes)

app.listen(PORT, function(){
    console.log("=====================================")
    console.log("YelCamp server has started")
    console.log("=====================================")
})