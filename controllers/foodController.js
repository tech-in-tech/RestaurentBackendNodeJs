const foodModal = require("../models/foodModel");
const orderModel = require("../models/orderModel");
// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      Category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const newFood = new foodModal({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      Category,
      code,
      isAvailable,
      restaurant,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error).send({
      success: false,
      message: "Error in create food API",
      error
    })
  }
};


// GET ALL FOOD
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModal.find({})
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No Food items Found"
      })
    }
    res.status(200).send({
      success: true,
      totlaFood: foods.length,
      foods
    })
  } catch (error) {
    console.log(error).send({
      success: false,
      message: "Error in Get All food API",
      error
    })
  }
}

// GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await foodModal.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "No Food Found",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
}

// GET FOOD By restaurant
const getFoodByRestaurantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await foodModal.find({ restaurant: resturantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found by Restaurant",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get Food by restaurant API",
      error,
    });
  }
}


// UPDATE FOOD ITEM
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "No Food Id Found"
      });
    }
    const food = await foodModal.findById(foodId);
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "No Food Found"
      });
    }
    const { title,
      description,
      price,
      imageUrl,
      foodTags,
      Category,
      code,
      isAvailable,
      restaurant,
      rating } = req.body;
    const updatedFood = await foodModal.findByIdAndUpdate(foodId, {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      Category,
      code,
      isAvailable,
      restaurant,
      rating
    }, { new: true })
    res.status(200).send({
      success: true,
      message: "Food Item Was Updated"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Food API",
      error
    })
  }
}

// DELETE FOOD
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Provide food Id"
      });
    }
    const food = await foodModal.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
        error
      });
    }
    await foodModal.findByIdAndDelete(foodId)
    res.status(200).send({
      success: true,
      message: "Food Item Deleted"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in DELETE Food API",
      error,
    })
  }
}

// Place Order
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "please food cart or payemnt method",
      });
    }
    let total = 0;
    //cal
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed successfully",
      newOrder,
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Place Order API',
      error
    })

  }
};

// CHANGE ORDER STATUS
const orderStatusController = async(req,res)=>{
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide valid order id",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } 
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Order Status API",
      error,
    });
  }
}

module.exports = { createFoodController, getAllFoodController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController,orderStatusController }