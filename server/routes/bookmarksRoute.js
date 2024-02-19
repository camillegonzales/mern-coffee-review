const express = require("express");
const { 
    getBookmarksCtrl,
    addBookmarkCtrl,
    removeBookmarkCtrl
} = require("../controllers/bookmarksCtrl");
const bookmarksRoute = express.Router();

// GET/api/bookmarks
bookmarksRoute.get("/", getBookmarksCtrl);

// POST/api/bookmarks
bookmarksRoute.post("/", addBookmarkCtrl);

// DELETE/api/bookmarks/:coffeeShopId
bookmarksRoute.delete("/:coffeeShopId", removeBookmarkCtrl);

module.exports = bookmarksRoute;