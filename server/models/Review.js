const mongoose = require("mongoose");

// Review schema
const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    coffeeShop: { type: mongoose.Schema.Types.ObjectId, ref: 'CoffeeShop', required: true },
    coffeeRating: { type: Number, min: 1, max: 5, required: true },
    foodRating: { type: Number, min: 1, max: 5, required: true },
    seatingRating: { type: Number, min: 1, max: 5, required: true },
    chargingRating: { type: Number, min: 1, max: 5, required: true },
    noiseRating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String }
}, {
    timestamps: true
});


// Review model
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;