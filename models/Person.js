const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        enum:["chef","waiter","owner"],
        required: true
    },
    mobile:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

//In the below line pre is a middleware function which is run just before save operation
//next callback will tell moongoose to save in database
personSchema.pre('save',async function(next){
    const person=this
    
    //We will have to hash the password only when it is new or changed
    //Whenever password is not changed it will do nothing
    if(!person.isModified('password')) return next()
    try{
        //Hashing password generation
        const salt=await bcrypt.genSalt(10)

        const hashedPassword=await bcrypt.hash(person.password,salt)

        //Override the plain password with the hashed password
        person.password=hashedPassword
        next()
    }
    catch(err){
        return next(err)
    }
})

personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password)
        return isMatch
    }
    catch(error){
        throw error
    }
}

//Creating Person model
const Person=mongoose.model('Person',personSchema)
module.exports=Person