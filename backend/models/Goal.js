const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    converImg: {type: String},
    progress: {type: Number, default: 0},
    habits: {type: mongoose.Schema.Types.ObjectId, ref: "Habits", default: null}
})

const Goal = mongoose.model('Goals', goalSchema)
module.exports = Goal;