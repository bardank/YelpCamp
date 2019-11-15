var middlewareObj = {};
var Campground = require('../models/campground');
var Comment = require('../models/comments');

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err || !foundComment) {
                res.redirect('back')
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next()
                } else {
                    req.flash("error", "Permission denied")
                    res.redirect('back')
                }
            }

        })
    } else {
        req.flash("error", "You must be loggedin to that!!")
        res.redirect('back')
    }
}

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err || !foundCampground) {
                req.flash("error", "Campground not found")
                res.redirect('back')
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next()
                } else {
                    req.flash("error", "Permission denied!!")
                    res.redirect('back')
                }
            }

        })
    } else {
        req.flash("error", "You must be logged in to do that.")
        res.redirect('back')
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash("error" , "You must be logged in to do that.")
        res.redirect('/login')
    }
}

module.exports = middlewareObj