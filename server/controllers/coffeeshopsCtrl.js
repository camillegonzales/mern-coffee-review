// Create coffee shop
const createShopCtrl = async (req,res) => {
    try {
        res.json({msg: "Add new coffee shop route"});
    } catch (error) {
        res.json(error);
    }
};

// Get all coffee shops
const getShopsCtrl = async (req,res) => {
    try {
        res.json({msg: "Get all coffee shops route"});
    } catch (error) {
        res.json(error);
    }
};

// Get single coffee shop
const getShopCtrl = async (req,res) => {
    try {
        res.json({msg: "Get a specific coffee shop route"});
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

// Add review to coffee shop
const addShopReviewCtrl = async (req,res) => {
    try {
        res.json({msg: "Add a review to a specific coffee shop route"});
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
    addShopReviewCtrl
};