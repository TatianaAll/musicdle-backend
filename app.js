
// import the express package
const express = require("express");

// create app with express.js
const app = express();

// precise that we use express so JSON used for requests
app.use(express.json());

// Adding CORS to allows requests from differents origins
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // access to everybody
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); // Allow headers
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // allow HTTP methods
  next();
});

module.exports = app;