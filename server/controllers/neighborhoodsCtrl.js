const Neighborhood = require("../models/Neighborhood");

// Get all neighborhoods for dropdown
const getNeighborhoodsCtrl = async (req,res) => {
    try {
        const neighborhoods = await Neighborhood.find();
        res.json({
            staus: "success",
            data: neighborhoods
        });
    } catch (error) {
        res.json(error);
    }
};

module.exports = getNeighborhoodsCtrl;
