const mongoose = require("mongoose");

// User schema
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CoffeeShop' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

// User model
const User = mongoose.model("User", userSchema)

module.exports = User;