const mongoose = require("mongoose");

// Neighborhood schema
const neighborhoodSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

// Neighborhood model
const Neighborhood = mongoose.model("Neighborhood", neighborhoodSchema);

module.exports = Neighborhood;
