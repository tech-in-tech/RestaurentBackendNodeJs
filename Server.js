//! - - - - - - - - - - - - - - - - - - - Import packages  - - - - - - - - - - - - - - - - -
// Import express
const express = require('express');
// Import CORS
const cors = require("cors");
// Import colors
const colors = require('colors');
// Import morgan
const morgan = require('morgan');
// Rest object
const app = express();
// .env
const dotenv = require('dotenv');
// config .env
dotenv.config()
//! - - - - - - - - - - - - - - - - - - - Middlewars  - - - - - - - - - - - - - - - - - - -

// Middleware for cross origin error
app.use(cors());

// Middleware to access data from clint in JSON formate
app.use(express.json())

// Middleware which tells us API method , status code and time taken by API
app.use(morgan('dev'));



// route
// URL => http://localhost:8080
app.get('/',(req,res)=>{
  return res.status(200).json("Welcon to food server");
}) 

//PORT 
const PORT  = process.env.PORT || 8080;

// Start the server and listen for connections on port 3000
app.listen(PORT,()=>{
  console.log(`Server running on PORT : ${PORT}`.bgCyan);
})