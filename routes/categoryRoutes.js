const express = require('express');

const authMiddleware = require("../middlewares/authMiddleware");
const { createCategoryController, getAllCategoryController, updateCategoryController, deleteCatController } = require('../controllers/categoryController');

const router = express.Router();

// Routes
// Create category
router.post("/create",authMiddleware,createCategoryController)

// Get All Catagory
router.get("/getAll",getAllCategoryController)

// UPDATE Catagory
router.put("/update/:id",authMiddleware,updateCategoryController)

// Delete Catagory
router.delete("/delete/:id",authMiddleware,deleteCatController)


module.exports= router;