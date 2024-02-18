// Set up
const express = require("express");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;

const app = express();

// Middlewares

// Routes
// Users routes
// POST/api/users/register
app.post("/api/users/register", async (req,res) => {
    try {
        res.json({msg: "Register user route"});
    } catch (error) {
        res.json(error);
    }
});

// POST/api/users/login
app.post("/api/users/login", async (req,res) => {
    try {
        res.json({msg: "Login user route"});
    } catch (error) {
        res.json(error);
    }
});

// GET/api/users/profile/:id
app.get("/api/users/profile/:id", async (req,res) => {
    try {
        res.json({msg: "User profile route"});
    } catch (error) {
        res.json(error);
    }
});

// DELETE/api/users/:id
app.delete("/api/users/:id", async (req,res) => {
    try {
        res.json({msg: "Delete user route"});
    } catch (error) {
        res.json(error);
    }
});

// PUT/api/users/:id
app.put("/api/users/:id", async (req,res) => {
    try {
        res.json({msg: "Update user route"});
    } catch (error) {
        res.json(error);
    }
});

// Coffee shops routes
// POST/api/coffeeshops 
app.post("/api/users/coffeeshops", async (req,res) => {
    try {
        res.json({msg: "Add new coffee shop route"});
    } catch (error) {
        res.json(error);
    }
});

// GET/api/coffeeshops
app.get("/api/users/coffeeshops", async (req,res) => {
    try {
        res.json({msg: "Get all coffee shops route"});
    } catch (error) {
        res.json(error);
    }
});

// GET/api/coffeeshops/:id
app.get("/api/users/coffeeshops/:id", async (req,res) => {
    try {
        res.json({msg: "Get a specific coffee shop route"});
    } catch (error) {
        res.json(error);
    }
});

// PUT/api/coffeeshops/:id
app.put("/api/users/coffeeshops/:id", async (req,res) => {
    try {
        res.json({msg: "Update a specific coffee shop route"});
    } catch (error) {
        res.json(error);
    }
});

// DELETE/api/coffeeshops/:id
app.delete("/api/users/coffeeshops/:id", async (req,res) => {
    try {
        res.json({msg: "Update a specific coffee shop route"});
    } catch (error) {
        res.json(error);
    }
});

// POST/api/coffeeshops/:id/reviews
app.post("/api/users/coffeeshops/:id", async (req,res) => {
    try {
        res.json({msg: "Add a review to a specific coffee shop route"});
    } catch (error) {
        res.json(error);
    }
});

// Reviews routes
// GET/api/reviews/:id
app.get("/api/reviews/:id", async (req,res) => {
    try {
        res.json({msg: "Get a specific review route"});
    } catch (error) {
        res.json(error);
    }
});

// PUT/api/reviews/:id
app.put("/api/reviews/:id", async (req,res) => {
    try {
        res.json({msg: "Update a specific review route"});
    } catch (error) {
        res.json(error);
    }
});

// DELETE/api/reviews/:id
app.delete("/api/reviews/:id", async (req,res) => {
    try {
        res.json({msg: "Delete a specific review route"});
    } catch (error) {
        res.json(error);
    }
});

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