
// import the express package
const express = require("express");

// create app with express.js
const app = express();

// precise that we use express so JSON used for requests
app.use(express.json());

// Ajout du CORS pour autoriser les requêtes entre origines différentes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // tout le monde peut y accéder
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); // Autorisation de certains en-têtes
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // autorisation des méthodes HTTP
  next();
});

module.exports = app;
