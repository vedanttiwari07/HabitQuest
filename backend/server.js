console.log("Starting server.js..."); // ✅ Check if this runs
require('dotenv').config({ path: './.env' }); 

const express = require("express");
const connectDB = require("./config/db");
const habitRouter = require("./routes/habitRoutes");
const goalRouter = require("./routes/goalRoutes");

const app = express();

console.log("Starting server.js..."); // ✅ Check if this runs

const startServer = async () => {
    try {
        console.log("Initializing server...");

        app.use(express.json());

        console.log("Checking .env file...");
        console.log("MONGO_URI:", process.env.MONGO_URI || "⚠️ MONGO_URI NOT SET");

        console.log("Connecting to database...");
        await connectDB(); // Ensures DB is connected before proceeding
        console.log("✅ Database connected.");

        app.use("/api/goals", goalRouter);
        app.use("/api/habits", habitRouter);

        console.log("Setting up routes...");

        app.listen(3000, () => {
            console.log("✅ App is listening on port 3000");
        });

    } catch (error) {
        console.error("❌ Error starting server:", error);
        process.exit(1);
    }
};

process.on("unhandledRejection", (err) => {
    console.log("🔥 Unhandled Rejection:", err);
});

startServer();