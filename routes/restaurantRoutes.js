const express = require('express');

const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurantController } = require('../controllers/restaurantController');
const router = express.Router();

// ROUTES
// CREATE RESAURANT || POST
router.post('/create',authMiddleware,createRestaurantController)

module.exports= router;