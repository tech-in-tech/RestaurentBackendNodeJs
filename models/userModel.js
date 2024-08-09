const mongoose = require('mongoose');

// schema
const userSchema = new mongoose.Schema({
  userName:{
    type: String,
    required:[true,'User Name is required']
  },
  email:{
    type:String,
    required:[true,'Email is required'],
    unique:true
  },
  password:{
    type:String,
    required:[true,'password is required']
  },
  address:{
    type:Array,
  },
  phone:{
    type:String,
    required:[true,'Phone number is required'],
  },
  userType:{
    type:String,
    required:[true,'Usertype is required'],
    default:'clinet',
    enum:['clinet','admin','vendor','driver']
  },
  profile:{
    type:String,
    default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  }
  // timestamps : tells when user created and updated
},{timestamps:true})

// export
module.exports = mongoose.model("User",userSchema);
