var express = require('express')
var router = express.Router()
var router = express.Router({mergeParams: true});
var middleware = require("../middleware/index")

var Campground = require('../models/campground')

//campground landing page
router.get("/", function (req, res){
    //get all campground from db
    Campground.find({}, function(err , allCamprounds){
        if (err){
            console.log("There is error")
        }else{
            res.render("campgrounds/index", {campgrounds: allCamprounds ,  currentUser: req.user})
        }
    });
});

//create new campground
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    var newCampground = {name: name, img: image, price: price , description: desc, author}
    //create new db and add to db
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            req.flash("error", "Something went wrong!!")
        }else{
            res.redirect("/campgrounds");
        }
    })
    
})

//campground form
router.get("/new", middleware.isLoggedIn , function(req, res){
    res.render("campgrounds/new")
})

//show about a particular campground
router.get("/:id", function(req, res){
    //find campground by id
    Campground.findById(req.params.id).populate("comments").exec(function(err, idFound){
        if (err || !idFound){
            req.flash("error", "campground not found")
            res.redirect("back")
        } else {
            res.render("campgrounds/show", {campground: idFound})
        }
    } )
})

//=============Edit campground================
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found")
            res.redirect("back")
        }
        res.render('campgrounds/edit', {campground :  foundCampground})
            
    })

})
//================update the edited campground=============
router.put('/:id', middleware.checkCampgroundOwnership, function (req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campgroundUpdated){
        if (err || !campgroundUpdated){
            req.flash("error", "Campground not found")
            res.redirect('/campgrounds')
        }else{
            res.redirect('/campgrounds/'+ req.params.id)
        }
    })
})
// delete campground
router.delete('/:id', middleware.checkCampgroundOwnership , function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err, deletd){
        if(err){
            req.flash("error", "Campground not found")
            res.redirect('/campgrounds')
        }else{
            res.redirect('/campgrounds')
        }
    })
})



module.exports = router