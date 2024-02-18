const express = require("express");
const bookmarksRoute = express.Router();

// GET/api/bookmarks
bookmarksRoute.get("/", async (req,res) => {
    try {
        res.json({msg: "Get all bookmarks for user route"});
    } catch (error) {
        res.json(error);
    }
});

// POST/api/bookmarks
bookmarksRoute.post("/", async (req,res) => {
    try {
        res.json({msg: "Add coffee shop to user's bookmarks route"});
    } catch (error) {
        res.json(error);
    }
});

// DELETE/api/bookmarks/:coffeeShopId
bookmarksRoute.delete("/:coffeeShopId", async (req,res) => {
    try {
        res.json({msg: "Remove a coffee shop from user's bookmarks route"});
    } catch (error) {
        res.json(error);
    }
});

module.exports = bookmarksRoute;