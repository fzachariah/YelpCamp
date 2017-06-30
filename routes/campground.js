
var express=require("express");

var router=express.Router();

var Campground=require("../models/campground");
var Comment=require("../models/comment");

router.get("/",function(req,res){
    
    Campground.find({},function(err,allCampgrounds){
        
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
        }
    });

    
    
});

router.get("/new",isLoggedIn,function(req, res) {
    
    res.render("campgrounds/new");
    
});

router.post("/",isLoggedIn,function(req,res){
    
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author={id:req.user._id,
        username:req.user.username
    };
    
    Campground.create( {name:name,image:image,description:desc,author:author},function(err,campground){
    if(err)
    {
        console.log("Error");
    }
    else{
        console.log(campground);
        res.redirect("/campgrounds");
    }
});
    
    
});


router.get("/:id",function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(error,foundCampground){
        
        if(error)
        {
            console.log(error);
        }
        else{
            console.log(foundCampground);
             res.render("campgrounds/show",{campground:foundCampground});
        }
        
    });
    
    
    
});


function isLoggedIn(req,res,next){
    
    
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}

module.exports=router;