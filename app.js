var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var flash=require("connect-flash");

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var User=require("./models/user");

var methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.use(flash());



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
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use(commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/",authRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp Server Started");
});