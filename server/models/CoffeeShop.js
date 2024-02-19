const mongoose = require("mongoose");

// Coffee shop schema
const coffeeShopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    neighborhood: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String },
    coffeeRating: { type: Number, min: 1, max: 5, required: true},
    foodRating: { type: Number, min: 1, max: 5, required: true },
    seatingRating: { type: Number, min: 1, max: 5, required: true},
    chargingRating: { type: Number, min: 1, max: 5, required: true },
    noiseRating: { type: Number, min: 1, max: 5, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

// Coffee shop model
const CoffeeShop = mongoose.model("User", userSchema)

module.exports = CoffeeShop;