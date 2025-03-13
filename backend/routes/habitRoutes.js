const express = require('express');
const Habit = require("../models/Habit.js")
const router = express.Router()

router.get('/', async (req,res) => {
    try {
        const habit = await Habit.find()
        res.json(habit)
    } catch(error) {
        res.status(500).json({msg: "Error fetching habits!", error: error.message})
    }
})

router.post('/add', async (req,res) => {
    try {
       const {name, type, goalId} = req.body
       const newHabit = new Habit({
        name,
        type,
        goalId,
        records: []
       })

       await newHabit.save()
       res.status(201).json(newHabit)
    } catch(error) {
        res.status(422).json({message: "Wrong inputs!", error: error.message})
    }
})

router.patch('/:id', async (req,res) => {
    try {
        const {date, value} = req.body
        const habit = await Habit.findById(req.params.id)

        if (!habit) {
            return res.status(404).json({message: "Habit not found!"})
        }

        habit.records.push({date, value})

        await habit.save();
        res.json(habit)
    } catch(error) {
        res.status(500).json({message: "Could not save habit!", error: error.message})
    }
})

module.exports = router;