const express = require("express");
const usersRoute = express.Router();


// POST/api/users/register
usersRoute.post('/register', async (req,res) => {
    try {
        res.json({msg: "Register user route"});
    } catch (error) {
        res.json(error);
    }
});

// POST/api/users/login
usersRoute.post("/login", async (req,res) => {
    try {
        res.json({msg: "Login user route"});
    } catch (error) {
        res.json(error);
    }
});

// GET/api/users/profile/:id
usersRoute.get("/profile/:id", async (req,res) => {
    try {
        res.json({msg: "User profile route"});
    } catch (error) {
        res.json(error);
    }
});

// DELETE/api/users/:id
usersRoute.delete("/:id", async (req,res) => {
    try {
        res.json({msg: "Delete user route"});
    } catch (error) {
        res.json(error);
    }
});

// PUT/api/users/:id
usersRoute.put("/:id", async (req,res) => {
    try {
        res.json({msg: "Update user route"});
    } catch (error) {
        res.json(error);
    }
});

module.exports = usersRoute;