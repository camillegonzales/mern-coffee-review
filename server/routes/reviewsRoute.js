const express = require("express");
const { 
    createReviewCtrl,
    getReviewCtrl,
    updateReviewCtrl,
    deleteReviewCtrl
} = require("../controllers/reviewsCtrl");
const isLogin = require("../middlewares/isLogin");
const reviewsRoute = express.Router();

// POST/reviews
reviewsRoute.post("/", isLogin, createReviewCtrl);

// GET/reviews/:id
reviewsRoute.get("/:id", getReviewCtrl);

// PUT/reviews/:id
reviewsRoute.put("/:id", updateReviewCtrl);

// DELETE/reviews/:id
reviewsRoute.delete("/:id", deleteReviewCtrl);

module.exports = reviewsRoute; 