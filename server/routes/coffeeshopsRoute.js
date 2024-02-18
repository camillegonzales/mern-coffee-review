const express = require("express");
const coffeeshopsRoute = express.Router();

// POST/api/coffeeshops 
coffeeshopsRoute.post("/ ", async (req,res) => {
    try {
        res.json({msg: "Add new coffee shop route"});
    } catch (error) {
        res.json(error);
    }
});

// GET/api/coffeeshops
coffeeshopsRoute.get("/", async (req,res) => {
    try {
        res.json({msg: "Get all coffee shops route"});
    } catch (error) {
        res.json(error);
    }
});

// GET/api/coffeeshops/:id
coffeeshopsRoute.get("/:id", async (req,res) => {
    try {
        res.json({msg: "Get a specific coffee shop route"});
    } catch (error) {
        res.json(error);
    }
});

// PUT/api/coffeeshops/:id
coffeeshopsRoute.put("/:id", async (req,res) => {
    try {
        res.json({msg: "Update a specific coffee shop route"});
    } catch (error) {
        res.json(error);
    }
});

// DELETE/api/coffeeshops/:id
coffeeshopsRoute.delete("/:id", async (req,res) => {
    try {
        res.json({msg: "Delete a specific coffee shop route"});
    } catch (error) {
        res.json(error);
    }
});

// POST/api/coffeeshops/:id/reviews
coffeeshopsRoute.post("/:id/reviews", async (req,res) => {
    try {
        res.json({msg: "Add a review to a specific coffee shop route"});
    } catch (error) {
        res.json(error);
    }
});


module.exports = coffeeshopsRoute;