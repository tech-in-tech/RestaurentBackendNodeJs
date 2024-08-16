const mongoose = require('mongoose');
// schema
const foodSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,"Food Title is required"]
  },
  description:{
    type:String,
    required:[true,"Food description is required"]
  },
  price:{
    type:Number,
    required:[true,"food Price is required"]
  },
  imageUrl:{
    type:String,
    default:"https://image.similarpng.com/very-thumbnail/2021/09/GoFod-food-logo-design-on-transparent-background-PNG.png"
  },
  foodTags:{
    type:String
  },
  Category:{
    type:String
  },
  code:{
    type:String
  },
  isAvailable:{
    type:Boolean,
    default:true
  },
  restaurant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Restaurant"
  },
  rating:{
    type:Number,
    default:5,
    min:1,
    max:5
  },
  ratingCount:{
    type:String
  }
}, { timestamps: true })

// export
module.exports = mongoose.model("Foods", foodSchema)