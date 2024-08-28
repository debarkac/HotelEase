const mongoose=require('mongoose')
require('dotenv').config()

const mongoURL=process.env.MONGODB_URL

//Setup MongoDB connection
mongoose.connect(mongoURL,{
    //These two parameters must be passed
    useNewUrlParser:true,
    useUnifiedTopology:true
})


//Mongoose maintains a default connection object representing MongoDB connection
const db=mongoose.connection;

//Event listeners
//They are understood by MongoDB
//db is the object created earlier

db.on('disconnected',()=>{
    console.log("MongoDB server disconnected")
})


db.on('connected',()=>{
    console.log("Connected to MongoDB server")
})

db.on('disconnected',()=>{
    console.log("MongoDB server disconnected")
})

db.on('error',()=>{
    console.log("MongoDB error")
})

module.exports=db

