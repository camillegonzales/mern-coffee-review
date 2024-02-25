const CoffeeShop = require("../models/CoffeeShop");
const User = require("../models/User");

// Get all bookmarks for user
const getBookmarksCtrl = async (req,res) => {
    try {
        res.json({msg: "Get all bookmarks for user route"});
    } catch (error) {
        res.json(error);
    }
};

// Add bookmark to user
const addBookmarkCtrl = async (req,res) => {
    try {
        const {
            user,
            coffeeShop
        } = req.body
        // 1. Find the logged in user
        const userFound = await User.findById(req.user);
        if (!userFound) {
            return res.json({
                error: "Please login to proceed"
            });
        }

        // 2. Find the coffee shop
        const coffeeShopFound = await CoffeeShop.findById(coffeeShop);
        if (!coffeeShopFound) {
            return res.json({
                error: "Coffee shop not found"
            });
        }

        // 3. Check if the coffee shop is already bookmarked by the user
        if (userFound.bookmarks.includes(coffeeShopFound._id)) {
            return res.json({ 
                error: "Coffee shop already bookmarked" });
        }

        // 4. Add the coffee shop to the user's bookmarks
        userFound.bookmarks.push(coffeeShopFound._id);
        await userFound.save();

        res.json({ 
            status: "success",
            message: "Coffee shop added to bookmarks successfully" 
        });
    } catch (error) {
        res.json(error);
    }
};

// Remove bookmark from user
const removeBookmarkCtrl = async (req,res) => {
    try {
        res.json({msg: "Remove a coffee shop from user's bookmarks route"});
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    getBookmarksCtrl,
    addBookmarkCtrl,
    removeBookmarkCtrl
};