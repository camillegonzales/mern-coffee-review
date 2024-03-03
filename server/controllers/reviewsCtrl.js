const CoffeeShop = require("../models/CoffeeShop");
const Review = require("../models/Review");
const User = require("../models/User");

// Create review
const createReviewCtrl = async (req,res) => {
    try {
        console.log('submitted. trying to create.')
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

        // Find the logged in user
        const userFound = await User.findById(user);
        if (!userFound) {
            return res.json({
                error: "Please login to proceed"
            });
        }

        // Find the coffee shop
        const coffeeShopFound = await CoffeeShop.findById(coffeeShop);
        if (!coffeeShopFound) {
            return res.json({
                error: "Coffee shop not found"
            });
        }

        if (!coffeeRating || !foodRating || !seatingRating || !chargingRating || !noiseRating) {
            return res.json({
                error: "Please choose a rating for all categories"
            });
        }
        
        console.log('no errors. going to submit')
        // Create the review
        const review = await Review.create({
            user: userFound._id,
            coffeeShop: coffeeShopFound._id,
            coffeeRating,
            foodRating,
            seatingRating,
            chargingRating,
            noiseRating,
            comment
        });

        // Push the review in to the user's reviews field
        userFound.reviews.push(review._id);
        await userFound.save()

        // Push the review in to the coffeeshop's reviews field
        coffeeShopFound.reviews.push(review._id);
        await coffeeShopFound.save();

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
        const id = req.params.id;
        const review = await Review.findById(id);
        if (!review) {
            return res.json({ 
                error: "Review not found" 
            });
        }
        res.json({
            status: "success",
            data: review
        });
    } catch (error) {
        res.json(error);
    }
};

// Update review
const updateReviewCtrl = async (req,res) => {
    try {
        const id = req.params.id;
        const { 
            coffeeRating, 
            foodRating, 
            seatingRating, 
            chargingRating, 
            noiseRating, 
            comment 
        } = req.body;

        // Find the review by ID and update it
        const updatedReview = await Review.findByIdAndUpdate(id, {
            coffeeRating,
            foodRating,
            seatingRating,
            chargingRating,
            noiseRating,
            comment
        }, { new: true });

        if (!updatedReview) {
            return res.json({ 
                error: "Review not found" 
            });
        }
        res.json({
            status: "success",
            data: updatedReview
        });
    } catch (error) {
        res.json(error);
    }
};

// Delete review
const deleteReviewCtrl = async (req,res) => {
    try {
        const id = req.params.id;

        // Find the review to be deleted
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        // Remove the review from the associated user's reviews array
        await User.findByIdAndUpdate(review.user, {
            $pull: { reviews: id }
        });

        // Remove the review from the associated coffee shop's reviews array
        await CoffeeShop.findByIdAndUpdate(review.coffeeShop, {
            $pull: { reviews: id }
        });

        // Delete the review from the database
        await Review.findByIdAndDelete(id);

        res.json({ 
            status: "success", 
            data: null 
        });
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