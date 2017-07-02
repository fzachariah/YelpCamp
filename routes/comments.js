
var express=require("express");
var router=express.Router();
var middleware=require("../middleware");

var Campground=require("../models/campground");
var Comment=require("../models/comment");


router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req, res) {
    
    Campground.findById(req.params.id,function(err,campground){
        
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:campground});
        }
    });
    
    
    
});

router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
    
    
    Campground.findById(req.params.id,function(err,campground){
        
        if(err)
        {
            console.log(err);
             res.redirect("/campgrounds");
        }
        else{
           console.log(req.body.comment);
           Comment.create(req.body.comment,function(err,comment){
               comment.author.id=req.user._id;
               comment.author.username=req.user.username;
               comment.save();
               campground.comments.push(comment);
               campground.save();
               res.redirect("/campgrounds/"+campground._id);
           });
        }
    });
    
});


router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    
    Comment.findById(req.params.comment_id,function(err, foundComments) {
        
        if(err)
        {
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComments});
        }
        
    });
    
});


router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
        
    });
});


router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        
        if(err)
        {
            console.log(err);
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});


module.exports=router;
