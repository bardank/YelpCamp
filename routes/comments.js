var express = require('express')
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comments');
var middleware = require("../middleware/index");



//====================================
// comment routes
//====================================
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function (err, campground){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", {campground: campground})
        }
    })
})

router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds")
        }else{
            // var text = req.body.text;
            // var author = req.body.author;
            // var newCampground = {text: text, author: author}
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "something went wrong!!")
                    console.log(err)
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save()
                    campground.comments.push(comment)
                    campground.save();
                    res.redirect("/campgrounds/"+ campground._id)
                }
            })
        }
    })
})

//========================
//====Comment edit=======
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back")
        }else{
            res.render("./comments/edit", {campground_id: req.params.id, comment: foundComment})
        }
    })

})

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id , function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found")
            res.redirect("back")
        }
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
            if(err){
                res.redirect("back")
            }else{
                res.redirect("/campgrounds/"+req.params.id)
            }
        })
    })
    
})

//==========Delete Comment=======
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err || !foundCampground){
            res.flash("error", "Campground not found!!")
            res.redirect("back")
        }
        Comment.findByIdAndDelete(req.params.comment_id, function(err, deleteComment){
            if(err){
                res.flash("error", "Comment not found!!")
                res.redirect("back")
            }else{
                req.flash("success", "Comment deleted")
                res.redirect("/campgrounds/"+req.params.id)
            }
        })
    })
    
})



module.exports =  router