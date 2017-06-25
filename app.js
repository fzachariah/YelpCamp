var express=require("express");
var app=express();

var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

var campGrounds=[
        {name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
        {name:"Granite Hill",image:"https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
        {name:"Mountain Goats Rest",image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
        {name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
        {name:"Granite Hill",image:"https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
        {name:"Mountain Goats Rest",image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
        {name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
        {name:"Granite Hill",image:"https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
        {name:"Mountain Goats Rest",image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"}
    ];

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){

    res.render("campgrounds",{campgrounds:campGrounds});
    
});

app.get("/campgrounds/new/",function(req, res) {
    
    res.render("new");
    
});

app.post("/campgrounds",function(req,res){
    
    var name=req.body.name;
    var image=req.body.image;
    
    campGrounds.push(({name:name,image:image}));
    
    res.redirect("/campgrounds");
    
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp Server Started");
});