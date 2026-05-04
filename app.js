// import the express package
import express from "express";
import prisma from "./prismaClient.js";

// create app with express.js
const app = express();

// precise that we use express so JSON used for requests
app.use(cors({ origin: "http://localhost:8081/" }));
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
  const { email, password, username } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required",
    });
  }

  try {
    const createdUser = await prisma.users.create({
      data: {
        email,
        password,
        username,
      },
      select: {
        id: true,
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