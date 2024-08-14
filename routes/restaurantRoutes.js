const express = require('express');

const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurantController, getAllRestaurantController, getResturantByIdController, deleteResturantController,  } = require('../controllers/restaurantController');
const router = express.Router();

// ROUTES
// CREATE RESAURANT || POST
router.post('/create',authMiddleware,createRestaurantController)

// GET ALL RESTAURANT || GET
router.get("/getAll",getAllRestaurantController)

// GET RESTAURANT by ID|| GET
router.get("/get/:id",getResturantByIdController)

// DELETE RESTAURANT by ID || GET
router.delete("/delete/:id",authMiddleware,deleteResturantController)
module.exports= router;