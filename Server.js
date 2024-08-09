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

app.get('/',(req,res)=>{
  return res.status(200).json("Welcon to food server");
}) 

//PORT 
const PORT  = process.env.PORT || 8080;

// Start the server and listen for connections on port 3000
app.listen(PORT,()=>{
  console.log(`Server running on PORT : ${PORT}`.bgCyan);
})