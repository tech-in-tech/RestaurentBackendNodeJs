const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
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
    // Hashing password
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password,salt)
    // creating new User
    const user = await userModel.create({ userName, email, password:hashedPassword, phone, address })
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

// LOGIN controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: 'Please Provide Email or Password'
      })
    }
    // Cheak User
    const user = await userModel.findOne({ email})
    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not Found'
      })
    }
    // Check user password || compare password 
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(500).send({
        success: false,
        message:"Invalid Password",
      });
    }
    const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn:"7D"
    })
    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    })
  } catch (error) {
    console.log("LoginController :: ", error);
    res.status(500).send({
      success: false,
      message: 'Error in Login API',
      error
    })
  }
}
module.exports = { registerController, loginController };