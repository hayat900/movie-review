var express=require('express');
var app=express();
var m=require('mongoose');
m.connect('mongodb://localhost/movie',{useNewUrlParser:true});
var b=require('body-parser');
app.use(b.urlencoded({extended:true}));
var mo=require('method-override');
app.use(mo('_method'));
bcrypt=require('bcrypt');
const Moviereview=m.model("Moviereview",{
    title:String,movietitle:String,description:String,stars:Number,password:String,dis:String});
                        
 
        app.listen(3000,function(request,response){
            console.log("running successfully");
        })
var exhs=require('express-handlebars');
app.set('view engine','handlebars');
app.engine('handlebars',exhs({defaultLayout:'main'}));
module.exports=app;
app.get('/',function(request,response){
    
   Moviereview.find().lean().then(reviews=>{
                    response.render("reviews-index.handlebars",{reviews:reviews});
   }).catch(err=>{
       console.log("err");
   });
});
                   
        
   
app.get('/reviews/new',function(request,response){
    response.render("reviews-new",{});
});
app.post('/reviews',function(request,response){
   
    Moviereview.create(request.body).then((review)=>{
        console.log(review);
        response.redirect('/');
        
    }).catch(err=>{
        console.log(err);
    });
    
    
    });
app.get('/reviews/:id',function(request,response){
  Moviereview.findById(request.params.id).lean().then(review=>{
                                              response.render("reviews-show.handlebars",{
                                                              review:review
                                                              });
  }).catch(err=>{
        console.log(err);
    });
    
    
});
app.get('/reviews/:id/edit',function(request,response){
    Moviereview.findById(request.params.id).lean().then(review=>{
                                              response.render("reviews-edit.handlebars",{
                                                              review:review
                                                              });
  }).catch(err=>{
        console.log(err);
    });

});
app.put('/reviews/:id',function(request,response){
     
  
    Moviereview.findByIdAndUpdate(request.params.id,request.body).then(review=>{
        
        response.redirect('/');
    })
    .catch(err=>{
        console.log(err);
    });
    
    
       });

app.get('/reviews/:id/delete',function(request,response){
    Moviereview.findById(request.params.id).lean().then(review=>{
                                              response.render("reviews-delete.handlebars",{
                                                              review:review
                                                              });
  }).catch(err=>{
        console.log(err);
    });

});
 /*app.delete('/reviews/:id',function(request,response){
   Moviereview.findBypassword({
       password:request.body.password},function(err,reviews){
       if(err){
           console.log("error");
       }
       else{
          
        console.log("successful");
  console.log(request.body.password);
             Moviereview.findByIdAndDelete(request.params.id).then(review=>{
                
                 response.redirect('/');
             });
       }
       console.log("great");
   });
 });*/
app.delete('/reviews/:id',function(request,response){
    var d=request.body.password;
    Moviereview.findOne({
       password:d},function(err,reviews){
       if(err){
           console.log(d);
           response.send("invalid");
       }
       else{
            console.log(request.body.password);
           console.log("successful");
          
           Moviereview.findByIdAndDelete(request.params.id).then(review=>{
                
                 response.redirect('/');
             });
       }
    });
});
        
          
                     
       
       
        

             
    