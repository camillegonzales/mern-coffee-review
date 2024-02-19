// Set up
const express = require("express");
require("./config/dbConnect");
const usersRoute = require("./routes/usersRoute");
const coffeeshopsRoute = require("./routes/coffeeshopsRoute");
const reviewsRoute = require("./routes/reviewsRoute");
const bookmarksRoute = require("./routes/bookmarksRoute");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

// Middlewares

// Routes
app.use("/api/users", usersRoute);
app.use("/api/coffeeshops", coffeeshopsRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/bookmarks", bookmarksRoute);

// Error handlers

// Listener
app.listen(PORT, console.log(`Server is runnin on port ${PORT}`));