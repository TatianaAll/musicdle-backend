

import express from 'express';
import cors from 'cors';
import searchRouter from './routes/search.js';
//import gameRouter from './routes/game.js';
import { rateLimiter } from './middlewares/express-rate-limit.js';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
//import { authMiddleware } from './middlewares/auth.js';
dotenv.config();


const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('musicdle/api/auth', authRouter);
app.use('musicdle/api/search', rateLimiter, searchRouter);
//app.use('musicdle/api/game', gameRouter);
//app.use('musicdle/api/game', authMiddleware, gameRouter);

app.listen(process.env.PORT || 3005, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});