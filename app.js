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



var commentRoutes=require("./routes/comments");
var campgroundRoutes=require("./routes/campground");
var authRoutes=require("./routes/index");
//seedDB();

app.use(require("express-session")({secret:"Febin is the best guy",resave:false,saveUninitialized:false}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});

app.use(commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/",authRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp Server Started");
});