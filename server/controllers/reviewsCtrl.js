const Review = require("../models/Review");
const User = require("../models/User");

// Create review
const createReviewCtrl = async (req,res) => {
    try {
        const {
            user,
            coffeeShop,
            coffeeRating,
            foodRating,
            seatingRating,
            chargingRating,
            noiseRating,
            comment
        } = req.body;
        // 1. Find the logged in user
        const userFound = await User.findById(req.user);
        if (!userFound) {
            return res.json({
                error: "Please login to proceed"
            });
        }
        // 2. Create the review
        const review = await Review.create({
            user: req.user,
            coffeeShop,
            coffeeRating,
            foodRating,
            seatingRating,
            chargingRating,
            noiseRating,
            comment
        });
        // 3. Push the review in to the user's reviews field
        userFound.reviews.push(review._id);
        // 4. Save the user
        await userFound.save()
        res.json({
            status: "success",
            data: review
        });
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