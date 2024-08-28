const express = require('express')
const router = express.Router()
const Person = require('./../models/Person')

//post is the method where we will know the data is being sent to save
router.post('/', async (req, res) => {
    try {
        const data = req.body

        //All these things are a lot to write so we do the following thing
        // const newPerson=new Person()
        // newPerson.name=data.name
        // newPerson.age=data.age
        // newPerson.work=data.work
        // newPerson.email=data.email
        // newPerson.address=data.address
        // newPerson.salary=data.salary  

        const newPerson = new Person(data)

        //Save the new person to the database
        const response = await newPerson.save()
        console.log("Data saved")
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.get('/', async (req, res) => {
    try {
        const response = await Person.find()
        console.log("Data fetch successful")
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})


//Parameterised API call
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType
        if (workType == 'chef' || workType == 'waiter' || workType == 'owner') {
            const response = await Person.find({ work: workType })
            console.log("Response fetch")
            res.status(200).json(response)
        }
        else {
            res.status(400).json({ error: 'Invalid work' })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.put('/:person_id', async (req, res) => {
    try {
        const personId = req.params.person_id  //Extracting the id from the url parameter
        const updatedPersonData = req.body   //Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,//Return updated document 
            runValidators: true,//Run mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: "Id not found" })
        }
        console.log("Data updated")
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.delete('/:person_id', async (req, res) => {
    try {
        const personId = req.params.person_id
        const response = await Person.findByIdAndDelete(personId)

        if (!response) {
            return res.status(404).json({ error: "Id not found" })
        }
        console.log("Data deleted")
        res.status(200).json({ message: "Id deleted" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

module.exports = router