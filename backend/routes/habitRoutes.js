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

router.put('/:habitId/records/:recordId', async (req, res) => {
    try {
        const { value } = req.body; // Get updated value
        const habit = await Habit.findById(req.params.habitId);

        if (!habit) {
            return res.status(404).json({ message: "Habit not found!" });
        }

        const record = habit.records.id(req.params.recordId);
        if (!record) {
            return res.status(404).json({ message: "Record not found!" });
        }

        record.value = value; // Update value

        await habit.save();
        res.json({ message: "Record updated successfully!", habit });
    } catch (error) {
        res.status(500).json({ message: "Could not update record!", error: error.message });
    }
});

router.delete('/:habitId/records/:recordId', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.habitId);

        if (!habit) {
            return res.status(404).json({ message: "Habit not found!" });
        }

        const updatedRecords = habit.records.filter(record => record._id.toString() !== req.params.recordId);

        if (updatedRecords.length === habit.records.length) {
            return res.status(404).json({ message: "Record not found!" });
        }

        habit.records = updatedRecords; // Remove record
        await habit.save();

        res.json({ message: "Record deleted successfully!", habit });
    } catch (error) {
        res.status(500).json({ message: "Could not delete record!", error: error.message });
    }
});



module.exports = router;