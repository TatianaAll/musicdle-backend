

import express from 'express';
import cors from 'cors';
import searchRouter from './routes/search.js';
import { rateLimiter } from './middlewares/express-rate-limit.js';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import gameRoutes from "./routes/game.js";
import "./services/cron/cronService.js";
import "./services/cron/cronTop50.js";
dotenv.config();


const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/search', rateLimiter, searchRouter);
app.use("/api/games", gameRoutes);

app.listen(process.env.PORT || 3005, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


// // Grab token
app.get("/spotify/login", (req, res) => {
  const scope = "playlist-read-private playlist-read-collaborative user-read-private";
  res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${scope}&redirect_uri=http://127.0.0.1:3005/spotify/callback`);
});

app.get("/spotify/callback", async (req, res) => {
  const code = req.query.code;
  console.log("code reçu:", code);
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64"),
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=http://127.0.0.1:3005/spotify/callback`,
  });
  const data = await response.json();
  res.json(data);
});