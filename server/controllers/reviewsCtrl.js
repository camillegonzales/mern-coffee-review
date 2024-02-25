const Review = require("../models/Review");

// Create review
const createReviewCtrl = async (req,res) => {
    try {
        res.json({msg: "Add new review route"});
    } catch (error) {
        res.json(error);
    }
};


// Get single review
const getReviewCtrl = async (req,res) => {
    try {
        res.json({msg: "Get a specific review route"});
    } catch (error) {
        res.json(error);
    }
};

// Update review
const updateReviewCtrl = async (req,res) => {
    try {
        res.json({msg: "Update a specific review route"});
    } catch (error) {
        res.json(error);
    }
};

// Delete review
const deleteReviewCtrl = async (req,res) => {
    try {
        res.json({msg: "Delete a specific review route"});
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    createReviewCtrl,
    getReviewCtrl,
    updateReviewCtrl,
    deleteReviewCtrl
};