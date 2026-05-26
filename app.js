// import the express package
import express from "express";
import bcrypt from "bcryptjs";
import prisma from "./prismaClient.js";

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

app.post("/users", async (req, res) => {
  const { name, email, password, username } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "name, email and password are required",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        username,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
      },
    });

    return res.status(201).json(createdUser);
  } catch (error) {
    if (error?.code === "P2002") {
      return res.status(409).json({
        message: "email already exists",
      });
    }

    return res.status(500).json({
      message: "database error",
    });
  }
});

export default app;