//load environmental variables
require("dotenv").config();

//import express
const express = require("express");

//import routes
const userRoutes = require("./routes/userRoutes");

//create express app
const app = express();

//middleware to parse JSON
app.use(express.json());

//mount routes
app.use("/api/users", userRoutes);

//import mongoose
const mongoose = require("mongoose");

//async function to connect to MongoDB
async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection Established");
  } catch (error) {
    console.error("Connection failed:", error.message);
    //rethrow error so server.js can handle process exit
    throw error;
  }
}

//test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the User Auth" });
});

//define port
const PORT = process.env.PORT || 3001;

//start server only after DB connection
async function startServer() {
  try {
    await connectDatabase(); //wait for DB connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1); //exit process if startup fails
  }
}

startServer();
