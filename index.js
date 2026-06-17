

import express from 'express';
import cors from 'cors';
import searchRouter from './routes/search.js';
import { rateLimiter } from './middlewares/express-rate-limit.js';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import gameRoutes from "./routes/game.js";
import "./services/cron/cronService.js";
import { authMiddleware } from './middlewares/auth.js';
import { checkRole } from './middlewares/checkRoles.js';
import swaggerSetup from './swagger.js';
dotenv.config();


const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/search', rateLimiter, searchRouter);
app.use("/api/games", gameRoutes);
// app.use("/api/games", authMiddleware, checkRole('USER'), gameRoutes);


swaggerSetup(app);
app.listen(process.env.PORT || 3005, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});