const CoffeeShop = require("../models/CoffeeShop");
const Review = require("../models/Review");
const User = require("../models/User");

// Calculate average ratings
const calculateAverageRatings = (reviews) => {
    if (!reviews || reviews.length === 0) {
        return {
            coffeeRating: 0,
            foodRating: 0,
            seatingRating: 0,
            chargingRating: 0,
            noiseRating: 0
        };
    }

    const totalReviews = reviews.length;
    const sum = reviews.reduce((acc, review) => {
        acc.coffeeRating += review.coffeeRating;
        acc.foodRating += review.foodRating;
        acc.seatingRating += review.seatingRating;
        acc.chargingRating += review.chargingRating;
        acc.noiseRating += review.noiseRating;
        return acc;
    }, {
        coffeeRating: 0,
        foodRating: 0,
        seatingRating: 0,
        chargingRating: 0,
        noiseRating: 0
    });

    const averageRatings = {
        coffeeRating: sum.coffeeRating / totalReviews,
        foodRating: sum.foodRating / totalReviews,
        seatingRating: sum.seatingRating / totalReviews,
        chargingRating: sum.chargingRating / totalReviews,
        noiseRating: sum.noiseRating / totalReviews
    };

    const roundedRatings = {
        coffeeRating: Math.round(averageRatings.coffeeRating * 2) / 2,
        foodRating: Math.round(averageRatings.foodRating * 2) / 2,
        seatingRating: Math.round(averageRatings.seatingRating * 2) / 2,
        chargingRating: Math.round(averageRatings.chargingRating * 2) / 2,
        noiseRating: Math.round(averageRatings.noiseRating * 2) / 2
    };

    return roundedRatings;
};

// Update coffee shop ratings
const updateCoffeeShopRatings = async (coffeeShopId) => {
    try {
        // Find the coffee shop
        const coffeeShop = await CoffeeShop.findById(coffeeShopId).populate('reviews');

        if (!coffeeShop) {
            throw new Error('Coffee shop not found');
        }

        if (coffeeShop.reviews && coffeeShop.reviews.length > 0) {
            // Calculate average ratings
            const averageRatings = calculateAverageRatings(coffeeShop.reviews);

            // Update coffee shop with new ratings
            coffeeShop.coffeeRating = averageRatings.coffeeRating;
            coffeeShop.foodRating = averageRatings.foodRating;
            coffeeShop.seatingRating = averageRatings.seatingRating;
            coffeeShop.chargingRating = averageRatings.chargingRating;
            coffeeShop.noiseRating = averageRatings.noiseRating;
        } else {
            // No reviews available, set ratings to 0
            coffeeShop.coffeeRating = 0;
            coffeeShop.foodRating = 0; 
            coffeeShop.seatingRating = 0; 
            coffeeShop.chargingRating = 0; 
            coffeeShop.noiseRating = 0;
        }

        // Save the updated coffee shop
        await coffeeShop.save();
    } catch (error) {
        throw new Error(`Failed to update coffee shop ratings: ${error.message}`);
    }
};

// Create review
const createReviewCtrl = async (req,res) => {
    try {
        const {
            coffeeShop,
            coffeeRating,
            foodRating,
            seatingRating,
            chargingRating,
            noiseRating,
            comment
        } = req.body;

        // Find the logged in user
        const userFound = await User.findById(req.user);
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
            console.log(req.body)
            return res.json({
                error: "Please choose a rating for all categories"
            });
        }
        
        // Create the review
        const review = await Review.create({
            user: req.user,
            coffeeShop: coffeeShop,
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

        // Update coffee shop ratings
        await updateCoffeeShopRatings(coffeeShop);

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

        try {
            await updateCoffeeShopRatings(updatedReview.coffeeShop);
        } catch (error) {
            console.error("Error updating coffee shop ratings:", error);
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

        try {
            // Update coffee shop ratings
            await updateCoffeeShopRatings(review.coffeeShop);
        } catch (error) {
            console.error("Error updating coffee shop ratings:", error);
        }
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
    calculateAverageRatings,
    updateCoffeeShopRatings,
    createReviewCtrl,
    getReviewCtrl,
    updateReviewCtrl,
    deleteReviewCtrl
};