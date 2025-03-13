const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, enum: ["done", "magnitude"], required: true},
    goalId: {type: mongoose.Schema.Types.ObjectId, ref: "Goals", default: null},
    records:[
        {
            date: Date,
            value: Number
        }
    ]
})

const Habits = mongoose.model("Habits", habitSchema)
module.exports = Habits;