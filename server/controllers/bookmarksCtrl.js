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

        // Check if the coffee shop is already bookmarked by the user
        if (userFound.bookmarks.includes(coffeeShopFound._id)) {
            return res.json({ 
                error: "Coffee shop already bookmarked" });
        }

        // Add the coffee shop to the user's bookmarks
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
        // Find the logged in user
        const userFound = await User.findById(req.user);
        if (!userFound) {
            return res.json({
                error: "Please login to proceed"
            });
        }

        // Extract the coffee shop ID from the request body
        const { coffeeShopId } = req.body;

        // Check if the coffee shop is bookmarked by the user
        const index = userFound.bookmarks.indexOf(coffeeShopId);
        if (index === -1) {
            return res.json({ 
                error: "Coffee shop is not bookmarked by the user" 
            });
        }

        // Remove the coffee shop from the user's bookmarks
        userFound.bookmarks.splice(index, 1);
        await userFound.save();

        res.json({ 
            status: "success",
            message: "Coffee shop removed from bookmarks successfully" 
        });
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    getBookmarksCtrl,
    addBookmarkCtrl,
    removeBookmarkCtrl
};