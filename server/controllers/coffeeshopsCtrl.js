const CoffeeShop = require("../models/CoffeeShop");
const Neighborhood = require("../models/Neighborhood");
const Review = require("../models/Review");

// Create coffee shop
const createShopCtrl = async (req,res) => {
    const {
        name,
        neighborhood: neighborhoodName,
        address,
        image,
        coffeeRating,
        foodRating,
        seatingRating,
        chargingRating,
        noiseRating,
        reviews
    } = req.body;

    // Check if the neighborhood exists
    let neighborhoodDB = await Neighborhood.findOne({ name: neighborhoodName });

    if (!neighborhoodDB) {
        // If the neighborhood doesn't exist, create a new one
        neighborhoodDB = await Neighborhood.create({ name: neighborhoodName });
    }
    try {
        const coffeeShop = await CoffeeShop.create({
            name,
            neighborhood: neighborhoodDB._id,
            address,
            image,
            coffeeRating,
            foodRating,
            seatingRating,
            chargingRating,
            noiseRating,
            reviews
        })
        res.json({
            status: "success",
            data: coffeeShop
        });
    } catch (error) {
        res.json(error);
    }
};

// Get all coffee shops
const getShopsCtrl = async (req,res) => {
    try {
        const coffeeShops = await CoffeeShop.find().populate('neighborhood');
        res.json({
            status: "success",
            data: coffeeShops
        });
    } catch (error) {
        res.json(error);
    }
};

// Get single coffee shop
const getShopCtrl = async (req,res) => {
    try {
        const coffeeShop = await CoffeeShop.findById(req.params.id);
        if (!coffeeShop) {
            return res.status(404).json({ error: "Coffee shop not found" });
        }
        res.json({
            status: "success",
            data: coffeeShop
        });
    } catch (error) {
        res.json(error);
    }
};

// Update coffee shop
const updateShopCtrl = async (req,res) => {
    try {
        const id = req.params.id;
        const {
            name,
            neighborhood,
            address,
            image,
            coffeeRating,
            foodRating,
            seatingRating,
            chargingRating,
            noiseRating,
            reviews
        } = req.body;

        // Find the coffee shop by ID and update it
        const updatedShop = await CoffeeShop.findByIdAndUpdate(id, {
            name,
            neighborhood,
            address,
            image,
            coffeeRating,
            foodRating,
            seatingRating,
            chargingRating,
            noiseRating,
            reviews
        }, { new: true });

        if (!updatedShop) {
            return res.json({ 
                error: "Coffee shop not found" 
            });
        }
        res.json({
            status: "success",
            data: updatedShop
        });
    } catch (error) {
        res.json(error);
    }
};

// Delete coffee shop
const deleteShopCtrl = async (req,res) => {
    try {
        const id = req.params.id;

        // Remove the coffee shop from users' bookmarks array
        await User.updateMany(
            { bookmarks: id },
            { $pull: { bookmarks: id } }
        );

        // Find all reviews associated with the coffee shop
        const reviews = await Review.find({ coffeeShop: id });

        // Extract review IDs
        const reviewIds = reviews.map(review => review._id);

        // Remove references to the coffee shop from users' reviews arrays
        await User.updateMany(
            { reviews: { $in: reviewIds } },
            { $pull: { reviews: { $in: reviewIds } } }
        );

        // Delete reviews associated with the coffee shop
        await Review.deleteMany({ coffeeShop: id });

        // Delete the coffee shop
        await CoffeeShop.findByIdAndDelete(id);

        res.json({ 
            status: "success", 
            data: null 
        });
    } catch (error) {
        res.json(error);
    }
};

// Get coffeeshops of specific neighborhood
const getShopsByNeighborhoodCtrl = async (req, res) => {
    const { neighborhood } = req.params;
    try {
        const coffeeShops = await CoffeeShop.find({ neighborhood });
        res.json({
            status: "success",
            data: coffeeShops
        });
    } catch (error) {
        res.json(error);
    }
};

// Order coffeeshops based on chosen rating category
const getShopsByRatingCtrl = async (req, res) => {
    const { ratingType } = req.params;
    try {
        const coffeeShops = await CoffeeShop.find().sort({ [ratingType]: -1 });
        res.json({
            status: "success",
            data: coffeeShops
        });
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    createShopCtrl,
    getShopsCtrl,
    getShopCtrl,
    updateShopCtrl,
    deleteShopCtrl,
    getShopsByNeighborhoodCtrl,
    getShopsByRatingCtrl
};