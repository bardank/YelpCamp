var mongoose = require ("mongoose");
var Campground = require("./models/campground")
var Comment = require("./models/comments")
var data = [
    {
        name: "Pokhara", 
        img : "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptatem officia id repellat provident et consectetur eius officiis sunt unde."
    },
    {
        name: "Koteshowr", 
        img : "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e77267bdc9f4dcc_340.jpg",
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptatem officia id repellat provident et consectetur eius officiis sunt unde."
    },
    {
        name: "Nagarkot", 
        img : "https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c722d72d49f45c551_340.jpg",
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptatem officia id repellat provident et consectetur eius officiis sunt unde."
    }
]

function seedb (){
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err)
        }
        console.log("Campground removed")
        // data.forEach( function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if (err){
        //             console.log(err)
        //         }else{
        //             console.log("campground created")
        //             //create new comments
        //             Comment.create(
        //                 {
        //                     text: "It is greate place to stay but no wifi :(",
        //                     author: "John"
        //                 }, function(err, comment){
        //                     if (err){
        //                         console.log(err)
        //                     }else {
        //                         campground.comments.push(comment)
        //                         campground.save();
        //                         console.log("Comments created")
        //                     }
        //                 }
        //             )
        //         }
        //     })
        // })
    })
    
}


module.exports = seedb ;