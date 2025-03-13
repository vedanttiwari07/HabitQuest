const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB database connected successfully")
    } catch(error) {
        console.log("Unable to connect to MongoDB database", error)
        process.exit(1)
    }
}

module.exports = connectDB;