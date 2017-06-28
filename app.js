var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/yelp_camp');
var Campground=require("./models/campground");
var seedDB=require("./seeds");
app.set("view engine","ejs");

seedDB();

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    
    Campground.find({},function(err,allCampgrounds){
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("index",{campgrounds:allCampgrounds});
        }
    });

    
    
});

app.get("/campgrounds/new/",function(req, res) {
    
    res.render("new");
    
});

app.post("/campgrounds",function(req,res){
    
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    
    Campground.create( {name:name,image:image,description:desc},function(err,campground){
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


app.get("/campgrounds/:id",function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(error,foundCampground){
        
        if(error)
        {
            console.log(error);
        }
        else{
            console.log(foundCampground);
             res.render("show",{campground:foundCampground});
        }
        
    });
    
    
    
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp Server Started");
});