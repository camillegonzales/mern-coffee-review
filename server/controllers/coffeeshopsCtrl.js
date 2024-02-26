const CoffeeShop = require("../models/CoffeeShop");
const Review = require("../models/Review");

// Create coffee shop
const createShopCtrl = async (req,res) => {
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
    try {
        const coffeeShop = await CoffeeShop.create({
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
        const coffeeShops = await CoffeeShop.find();
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
        res.json({msg: "Update a specific coffee shop route"});
    } catch (error) {
        res.json(error);
    }
};

// Delete coffee shop
const deleteShopCtrl = async (req,res) => {
    try {
        res.json({msg: "Delete a specific coffee shop route"});
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    createShopCtrl,
    getShopsCtrl,
    getShopCtrl,
    updateShopCtrl,
    deleteShopCtrl
};