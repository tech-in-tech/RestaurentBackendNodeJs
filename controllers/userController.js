const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
// GET USER INFO
const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id })  // {_id:0} to hide the field
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found"
      })
    }
    // res send
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user
    })
  } catch (error) {
    console.log("ERROR USERCONTROLLER :: ", error)
    res.status(500).send({
      success: false,
      message: "Error in get user API",
      error
    })
  }
};

// UPDATE USER
const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id })
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      })
    }
    // Update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName
    if (address) user.address = address
    if (phone) user.phone = phone
    // save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Update Successfully",
    })
  } catch (error) {
    console.log("ERROR userController :: ", error)
    res.status(500).send({
      success: false,
      message: "Error in update user API",
      error
    })
  }
}

// update user password
const updatePasswordController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id })
    // validation
    if (!user) {
      return res.status(404).send({
        seccess: false,
        message: 'User Not Found'
      })
    }
    // get data from user
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: 'Please Provide old or new password'
      })
    }
    // Check user password || compare password 
    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old Password",
      });
    }
    // Hashing password
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: 'Password Update'
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Password Update API',
      error
    })
  }
}

// RESET PASSWORD 
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Field"
      })
    }
    const user = await userModel.findOne({ email, answer })
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found or Invalid Answer"
      })
    }
    // Hashing password
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "password Reset Successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in PASSWORD RESET API",
      error
    })
  }
}


const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({
      success:true,
      message:'Your account has been deleted',
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in DELETE profile API",
      error
    })
  }
}
module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController
};