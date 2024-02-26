const express = require("express");
const {
    createShopCtrl,
    getShopsCtrl,
    getShopCtrl,
    updateShopCtrl,
    deleteShopCtrl
} = require("../controllers/coffeeshopsCtrl")
const coffeeshopsRoute = express.Router();

// POST/coffeeshops 
coffeeshopsRoute.post("/", createShopCtrl);

// GET/coffeeshops
coffeeshopsRoute.get("/", getShopsCtrl);

// GET/coffeeshops/:id
coffeeshopsRoute.get("/:id", getShopCtrl);

// PUT/coffeeshops/:id
coffeeshopsRoute.put("/:id", updateShopCtrl);

// DELETE/coffeeshops/:id
coffeeshopsRoute.delete("/:id", deleteShopCtrl);

module.exports = coffeeshopsRoute;