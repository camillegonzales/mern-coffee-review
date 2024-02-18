const express = require("express");
const reviewsRoute = express.Router();

// GET/api/reviews/:id
reviewsRoute.get("/:id", async (req,res) => {
    try {
        res.json({msg: "Get a specific review route"});
    } catch (error) {
        res.json(error);
    }
});

// PUT/api/reviews/:id
reviewsRoute.put("/:id", async (req,res) => {
    try {
        res.json({msg: "Update a specific review route"});
    } catch (error) {
        res.json(error);
    }
});

// DELETE/api/reviews/:id
reviewsRoute.delete("/:id", async (req,res) => {
    try {
        res.json({msg: "Delete a specific review route"});
    } catch (error) {
        res.json(error);
    }
});

module.exports = reviewsRoute; 