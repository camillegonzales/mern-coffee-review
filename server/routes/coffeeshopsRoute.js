const express = require("express");
const {
    createShopCtrl,
    getShopsCtrl,
    getShopCtrl,
    updateShopCtrl,
    deleteShopCtrl,
    addShopReviewCtrl
} = require("../controllers/coffeeshopsCtrl")
const coffeeshopsRoute = express.Router();

// POST/api/coffeeshops 
coffeeshopsRoute.post("/", createShopCtrl);

// GET/api/coffeeshops
coffeeshopsRoute.get("/", getShopsCtrl);

// GET/api/coffeeshops/:id
coffeeshopsRoute.get("/:id", getShopCtrl);

// PUT/api/coffeeshops/:id
coffeeshopsRoute.put("/:id", updateShopCtrl);

// DELETE/api/coffeeshops/:id
coffeeshopsRoute.delete("/:id", deleteShopCtrl);

// POST/api/coffeeshops/:id/reviews
coffeeshopsRoute.post("/:id/reviews", addShopReviewCtrl);


module.exports = coffeeshopsRoute;