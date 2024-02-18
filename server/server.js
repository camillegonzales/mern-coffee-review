// Set up
const express = require("express");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;

const app = express();

// Middlewares

// Routes

// Error handlers

// Listener
app.listen(PORT, console.log(`Server is runnin on port ${PORT}`));