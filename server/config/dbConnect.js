const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

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