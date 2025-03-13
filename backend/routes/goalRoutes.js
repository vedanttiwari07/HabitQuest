const express = require('express');
const router = express.Router();
const Goal = require("../models/Goal.js");

router.get('/', async (req,res) => {
    try {
        const goal = await Goal.find()
        res.json(goal)
    } catch(error) {
        res.status(500).json({message: "Error fetching goals!", error: error.message})
    }
})

router.post('/add', async (req,res) => {
    try{
        const {title,description, habits} = req.body
        const newGoal = new Goal({
            title,
            description,
            habits
        })

        await newGoal.save()
        res.status(201).json(newGoal);
    } catch(error) {
        res.status(422).json({message: "Invalid goal input", error: error.message})
    }
})
module.exports = router;