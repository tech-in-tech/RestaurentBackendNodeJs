const userModel = require("../models/userModel");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body
    // Validation to check the above data is provided or not
    if (!userName || !email || !password || !phone || !address) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields"
      })
    }
    // check User
    const exisiting = await userModel.findOne({ email: email })
    if (exisiting) {
      return res.status(500).send({
        success: false,
        message: "Email Already REgistered please Login"
      })
    }
    // creating new User
    const user = await userModel.create({ userName, email, password, phone, address })
    res.status(201).send({
      success: true,
      message: "Successfully Register",
      user: user
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registor API | registerController",
      Error: error
    })
  }
}
module.exports = { registerController };