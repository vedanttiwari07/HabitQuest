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

router.patch('/:id', async (req, res) => {
    try {
        const { habits } = req.body;

        // Find the goal
        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        // Update the goal's habits field
        goal.habits = habits;
        await goal.save();

        res.json({ message: "Habit assigned to goal successfully", goal });
    } catch (error) {
        res.status(500).json({ message: "Error updating goal", error: error.message });
    }
});


module.exports = router;