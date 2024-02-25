const express = require("express");
const { 
    createReviewCtrl,
    getReviewCtrl,
    updateReviewCtrl,
    deleteReviewCtrl
} = require("../controllers/reviewsCtrl");
const reviewsRoute = express.Router();

// POST/reviews
reviewsRoute.post("/", createReviewCtrl);

// GET/api/reviews/:id
reviewsRoute.get("/:id", getReviewCtrl);

// PUT/api/reviews/:id
reviewsRoute.put("/:id", updateReviewCtrl);

// DELETE/api/reviews/:id
reviewsRoute.delete("/:id", deleteReviewCtrl);

module.exports = reviewsRoute; 