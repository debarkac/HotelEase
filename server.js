const express=require('express')
const app=express()
const db=require('./db')
const Person=require('./models/Person')
const MenuItem=require('./models/Menu')
require('dotenv').config()

const bodyParser=require('body-parser')
app.use(bodyParser.json())//req.body

app.get('/',function(req,res){
    res.send("Hello welcome to the hotel")
})




//Importing person routes
const personRoutes=require('./routes/personRoutes')
const menuRoutes=require('./routes/menuRoutes')

//Using the routes
app.use('/person',personRoutes)
app.use('',menuRoutes)

const PORT=process.env.PORT || 3000

app.listen(3000,()=>(
    console.log("Running on 3000")//prints on console
))