const express=require('express')
const app=express()
const db=require('./db')
const Person=require('./models/Person')
const MenuItem=require('./models/Menu')
require('dotenv').config()
const passport=require('./auth')


const bodyParser=require('body-parser')
app.use(bodyParser.json())//req.body

//Middlewares
//Stores the log when an endpoint is hit
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`)
    next()   //In every middleware next is important
}

//Store the log when any endpoint is hit
app.use(logRequest)


//Passport is initialized
app.use(passport.initialize())

//If we want to store the log when the following endpoint is hit 
//app.get('/',logRequest,function(req,res){
const localAuthMiddleware=passport.authenticate('local',{session:false})
app.get('/',localAuthMiddleware,function(req,res){
    res.send("Hello welcome to the hotel")
})




//Importing person routes
const personRoutes=require('./routes/personRoutes')
const menuRoutes=require('./routes/menuRoutes')

//Using the routes
//app.use('/person',localAuthMiddleware,personRoutes)
app.use('/person',personRoutes)
app.use('',menuRoutes)

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>(
    console.log("Running on 3000")//prints on console
))