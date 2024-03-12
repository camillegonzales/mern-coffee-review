const mongoose = require("mongoose");

// Coffee shop schema
const coffeeShopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    neighborhood: { type: mongoose.Schema.Types.ObjectId, ref: 'Neighborhood', required: true },
    address: { type: String, required: true },
    image: { type: String },
    coffeeRating: { type: Number, min: null, max: 5, default: null },
    foodRating: { type: Number, min: null, max: 5, default: null },
    seatingRating: { type: Number, min: null, max: 5, default: null },
    chargingRating: { type: Number, min: null, max: 5, default: null },
    noiseRating: { type: Number, min: null, max: 5, default: null },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

// Coffee shop model
const CoffeeShop = mongoose.model("CoffeeShop", coffeeShopSchema);

module.exports = CoffeeShop;