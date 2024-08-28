const express=require('express')
const router=express.Router()
const MenuItem=require('./../models/Menu')

router.post('/menu',async(req,res)=>{
    try{
        const data=req.body
        const newMenu=new MenuItem(data)

        const response=await newMenu.save()
        console.log("Data saved")
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
})

router.get('/menu',async(req,res)=>{
    try{
        const response=await MenuItem.find()
        console.log("Data fetch successful")
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports=router