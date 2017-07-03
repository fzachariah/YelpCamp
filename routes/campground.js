
var express=require("express");

var router=express.Router();
var middleware=require("../middleware");

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

router.get("/new",middleware.isLoggedIn,function(req, res) {
    
    res.render("campgrounds/new");
    
});

router.post("/",middleware.isLoggedIn,function(req,res){
    
    var name=req.body.name;
    var image=req.body.image;
    var price=req.body.price;
    var desc=req.body.description;
    var author={id:req.user._id,
        username:req.user.username
    };
    
    Campground.create( {name:name,price:price,image:image,description:desc,author:author},function(err,campground){
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

//Edit & Update

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
    
        Campground.findById(req.params.id,function(err,foundCampground){
        
                if(err)
                {
                     res.redirect("/campgrounds");
                }
                else{
            
                        res.render("campgrounds/edit",{campground:foundCampground});
            
                }
        
        });
    
   
    
});


router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
        
    });
    
});


//delete

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    
    Campground.findByIdAndRemove(req.params.id,function(err){
        
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
            
            
        }
    });
});




module.exports=router;