const express = require("express");
const { 
    getBookmarksCtrl,
    addBookmarkCtrl,
    removeBookmarkCtrl
} = require("../controllers/bookmarksCtrl");
const bookmarksRoute = express.Router();

// GET/bookmarks
bookmarksRoute.get("/", getBookmarksCtrl);

// POST/bookmarks
bookmarksRoute.post("/", addBookmarkCtrl);

// DELETE/bookmarks/:coffeeShopId
bookmarksRoute.delete("/:coffeeShopId", removeBookmarkCtrl);

module.exports = bookmarksRoute;