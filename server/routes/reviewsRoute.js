const express = require("express");
const { 
    getReviewCtrl,
    updateReviewCtrl,
    deleteReviewCtrl
} = require("../controllers/reviewsCtrl");
const reviewsRoute = express.Router();

// GET/api/reviews/:id
reviewsRoute.get("/:id", getReviewCtrl);

// PUT/api/reviews/:id
reviewsRoute.put("/:id", updateReviewCtrl);

// DELETE/api/reviews/:id
reviewsRoute.delete("/:id", deleteReviewCtrl);

module.exports = reviewsRoute; 