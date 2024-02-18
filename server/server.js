// Set up
const express = require("express");
const usersRoute = require("./routes/usersRoute");
const coffeeshopsRoute = require("./routes/coffeeshopsRoute");
const reviewsRoute = require("./routes/reviewsRoute");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

// Middlewares

// Routes
app.use("/api/users", usersRoute);
app.use("/api/coffeeshops", coffeeshopsRoute);
app.use("/api/reviews", reviewsRoute);

// Bookmarks routes
// GET/api/bookmarks
app.get("/api/bookmarks", async (req,res) => {
    try {
        res.json({msg: "Get all bookmarks for user route"});
    } catch (error) {
        res.json(error);
    }
});

// POST/api/bookmarks
app.post("/api/bookmarks", async (req,res) => {
    try {
        res.json({msg: "Add coffee shop to user's bookmarks route"});
    } catch (error) {
        res.json(error);
    }
});

// DELETE/api/bookmarks/:coffeeShopId
app.delete("/api/bookmarks/:coffeeShopId", async (req,res) => {
    try {
        res.json({msg: "Remove a coffee shop from user's bookmarks route"});
    } catch (error) {
        res.json(error);
    }
});

// Error handlers

// Listener
app.listen(PORT, console.log(`Server is runnin on port ${PORT}`));