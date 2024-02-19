const mongoose = require("mongoose");

// Coffee shop schema
const coffeeShopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    neighborhood: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String },
    coffeeRating: { type: Number, min: 0, max: 5, default: 0 },
    foodRating: { type: Number, min: 0, max: 5, default: 0 },
    seatingRating: { type: Number, min: 0, max: 5, default: 0 },
    chargingRating: { type: Number, min: 0, max: 5, default: 0 },
    noiseRating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

// Coffee shop model
const CoffeeShop = mongoose.model("User", userSchema)

module.exports = CoffeeShop;