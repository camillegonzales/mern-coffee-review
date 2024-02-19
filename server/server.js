// Set up
const express = require("express");
const usersRoute = require("./routes/usersRoute");
const coffeeshopsRoute = require("./routes/coffeeshopsRoute");
const reviewsRoute = require("./routes/reviewsRoute");
const bookmarksRoute = require("./routes/bookmarksRoute");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

const app = express();

// Connect to database
const dbConnect = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Successfully connected to database")
    } catch (error) {
        console.log("Failed to connect to database", error); 
        process.exit(1);
    }
};
dbConnect();

// Middlewares

// Routes
app.use("/api/users", usersRoute);
app.use("/api/coffeeshops", coffeeshopsRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/bookmarks", bookmarksRoute);

// Error handlers

// Listener
app.listen(PORT, console.log(`Server is runnin on port ${PORT}`));