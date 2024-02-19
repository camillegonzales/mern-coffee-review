const mongoose = require("mongoose");

// Coffee shop schema
const coffeeShopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    neighborhood: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String },
    coffeeRating: { type: Number, min: 1, max: 5, default: null },
    foodRating: { type: Number, min: 1, max: 5, default: null },
    seatingRating: { type: Number, min: 1, max: 5, default: null },
    chargingRating: { type: Number, min: 1, max: 5, default: null },
    noiseRating: { type: Number, min: 1, max: 5, default: null },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

// Coffee shop model
const CoffeeShop = mongoose.model("CoffeeShop", coffeeShopSchema);

module.exports = CoffeeShop;