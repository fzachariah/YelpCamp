var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var seeds=[
    {name:"Clouds Rest",
    image:"https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."   
    },
    {name:"Desert Mesa",
    image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."   
    },
    {name:"Canoyn Floor",
    image:"https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."   
    }
];

function seedDB()
{
    Campground.remove({},function(err)
    {
            if(err)
            {
                console.log(err);
            }
            console.log("Cleaned Successfully");
            seeds.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                if(err)
                {
                console.log(err);
                }
                else
                {
                    Comment.create({
                        
                        text:"This Place is Great,but i wish there was current",
                        author:"Homer"
                        
                    },function(err,comment){
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            campground.comments.push(comment);
                            campground.save();
                        }
                        
                    });
                }
        
            });
        });
    });
    
    
}

module.exports=seedDB;

