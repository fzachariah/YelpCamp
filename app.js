var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/yelp_camp');
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var seedDB=require("./seeds");
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
var passport=require("passport");
var LocalStrategy=require("passport-local");


var User=require("./models/user");

seedDB();


//

app.use(require("express-session")({secret:"Febin is the best guy",resave:false,saveUninitialized:false}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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
            res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
        }
    });

    
    
});

app.get("/campgrounds/new/",function(req, res) {
    
    res.render("campgrounds/new");
    
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
             res.render("campgrounds/show",{campground:foundCampground});
        }
        
    });
    
    
    
});


app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req, res) {
    
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

app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
    
    
    Campground.findById(req.params.id,function(err,campground){
        
        if(err)
        {
            console.log(err);
             res.redirect("/campgrounds");
        }
        else{
           console.log(req.body.comment);
           Comment.create(req.body.comment,function(err,comment){
               campground.comments.push(comment);
               campground.save();
               res.redirect("/campgrounds/"+campground._id);
           });
        }
    });
    
});


//Auth Routes

app.get("/register",function(req, res) {
   res.render("register"); 
});

app.post("/register",function(req, res) {
    
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err)
        {
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            
            res.redirect("/campgrounds");
            
        });
    });
    
});


app.get("/login",function(req, res) {
   res.render("login"); 
});

app.post("/login",passport.authenticate("local",{successRedirect:"/campgrounds",failureRedirect:"/login"}),function(req, res) {
});

app.get("/logout",function(req, res) {
    
    req.logout();
    res.redirect("/campgrounds");
    
    
});

function isLoggedIn(req,res,next){
    
    
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}




app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp Server Started");
});