//! - - - - - - - - - - - - - - - - - - - Import packages  - - - - - - - - - - - - - - - - -
const express = require('express');
const cors = require("cors");
const colors = require('colors');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
require('dotenv').config();
const db = require('./config/db');
//! - - - - - - - - - - - - - - - - - - - Middlewars  - - - - - - - - - - - - - - - - - - -

// Middleware for cross origin error
app.use(cors());

// Middleware to access data from clint in JSON formate
app.use(express.json())

// Middleware which tells us API method , status code and time taken by API
app.use(morgan('dev'));



// route
// URL => http://localhost:8080
app.use('/api/v1/test',require('./routes/testRoutes'))
app.use('/api/v1/auth',require('./routes/authRoutes'))
app.use('/api/v1/user',require('./routes/userRoutes'))
app.use('/api/v1/restaurant',require('./routes/restaurantRoutes'))
app.use('/api/v1/category',require('./routes/categoryRoutes'))

app.get('/',(req,res)=>{
  return res.status(200).json("Welcon to food server");
}) 

//PORT 
const PORT  = process.env.PORT || 8080;

// Start the server and listen for connections on port 3000
app.listen(PORT,()=>{
  console.log(`Server running on PORT : ${PORT}`.bgCyan);
})