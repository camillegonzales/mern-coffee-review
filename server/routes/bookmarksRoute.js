const express = require("express");
const { 
    getBookmarksCtrl,
    addBookmarkCtrl,
    removeBookmarkCtrl
} = require("../controllers/bookmarksCtrl");
const isLogin = require("../middlewares/isLogin");
const bookmarksRoute = express.Router();

// GET/bookmarks
bookmarksRoute.get("/", isLogin, getBookmarksCtrl);

// POST/bookmarks
bookmarksRoute.post("/", isLogin, addBookmarkCtrl);

// DELETE/bookmarks/:coffeeShopId
bookmarksRoute.delete("/:coffeeShopId", isLogin, removeBookmarkCtrl);

module.exports = bookmarksRoute;