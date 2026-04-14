
// import the express package
const express = require("express");
const { pool } = require('./db');

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

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'name, email and password are required',
    });
  }

  try {
    const result = await pool.query(
      `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at
      `,
      [name, email, password]
    );

    const user = result.rows[0];

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        message: 'email already exists',
      });
    }

    return res.status(500).json({
      message: 'database error',
    });
  }
});

module.exports = app;
