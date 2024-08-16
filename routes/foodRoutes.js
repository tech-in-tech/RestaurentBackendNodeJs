const express = require('express');

const authMiddleware = require("../middlewares/authMiddleware");
const {createFoodController, getAllFoodController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController} = require("../controllers/foodController");
const adminMiddleware = require('../middlewares/adminMiddleware');


const router = express.Router();

// routes
// CREATE FOOD
router.post('/create', authMiddleware, createFoodController)

// get ALL FOOD
router.get('/getAll', getAllFoodController)

// get SINGLE FOOD
router.get('/get/:id',getSingleFoodController )

// get FOOD by restaurant
router.get('/getByRestaurant/:id',getFoodByRestaurantController )

// UPDATE FOOD
router.put('/update/:id',authMiddleware,updateFoodController )

// DELETE FOOD
router.delete('/delete/:id',authMiddleware,deleteFoodController )

// PLACE ORDER
router.post('/placeOrder',authMiddleware,placeOrderController )

// ORDER STATUS
router.post('/orderStatus/:id',adminMiddleware,authMiddleware,orderStatusController)
module.exports = router;