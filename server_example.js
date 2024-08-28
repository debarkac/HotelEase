const express=require('express')
const app=express()

app.get('/',function(req,res){
    res.send("Hello how are you")
})

app.get('/football',function(req,res){
    res.send("Yes we can play football today")
})

app.get('/cricket',function(req,res){
    var cricket_sport={
        name:"india",
        players:11,
        champions:true
    }
    res.send(cricket_sport)//returns a json file
})

app.listen(3000,()=>(
    console.log("Running on 3000")//prints on console
))