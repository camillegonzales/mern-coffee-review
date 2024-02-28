const express = require("express");
const getNeighborhoodsCtrl = require("../controllers/neighborhoodsCtrl");
const neighborhoodsRoute = express.Router();

// GET/neighborhoods
neighborhoodsRoute.get('/', getNeighborhoodsCtrl);

module.exports = neighborhoodsRoute;
