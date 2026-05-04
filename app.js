// import the express package
import express from "express";
import prisma from "./prismaClient.js";
import cors from "cors";

// create app with express.js
const app = express();

// precise that we use express so JSON used for requests
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());




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
        name: username
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
      },
    });

    return res.status(201).json(createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
  }
});

export default app;