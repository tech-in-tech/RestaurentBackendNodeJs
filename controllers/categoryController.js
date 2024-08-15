// Import Category Model
// const { response } = require("express");
const categoryModel = require("../models/catagoryModel");
const router = require("../routes/restaurantRoutes");
// CREATE CATEGORY
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body
    // Validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please provide Category Title"
      })
    }
    const newCategory = new categoryModel({ title, imageUrl })
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "category created",
      newCategory
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Category API",
      error
    })
  }
}


// GET ALL CATEGORY
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({})
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No Category Find"
      })
    }
    res.status(200).send({
      success: true,
      totalCategory: categories.length,
      categories
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get All Category API",
      error
    })
  }
}


// Update Category
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No Category Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update cat api",
      error,
    });
  }
};

// DLEETE CATAGORY
const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide Category ID",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No Category Found With this id",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category Deleted succssfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Dlete Cat APi",
      error,
    });
  }
};
module.exports = { createCategoryController, getAllCategoryController, updateCategoryController,deleteCatController }