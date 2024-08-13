// CREATE RESTAURANT
const restaurantModel = require("../models/restaurantModel")

const createRestaurantController = async (req, res) => {
  try {
    const { title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords
    } = req.body
    //  validattion
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please Provide title and address"
      })
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords
    })
    await newRestaurant.save();
    res.status(201).send({
      success:true,
      message:"New Restaurant Created Successfullly"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Create restaurant API',
      error
    })
  }
}

module.exports = { createRestaurantController };