console.log("Starting server.js..."); // ✅ Check if this runs
require('dotenv').config({ path: '../.env' }); 

const express = require("express");
const connectDB = require("./config/db");
const habitRouter = require("./routes/habitRoutes");
const goalRouter = require("./routes/goalRoutes");

const app = express();



app.use(express.json());
connectDB(); // Ensures DB is connected before proceeding

app.use("/api/goals", goalRouter);
app.use("/api/habits", habitRouter);


app.listen(3000, () => {
     console.log("✅ App is listening on port 3000");
    });
