const express = require('express');
const cors = require('cors');
const searchRouter = require('./routes/search.js');
const { rateLimiter } = require('./middlewares/express-rate-limit.js');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth.js');
const gameRoutes = require('./routes/game.js');
const cronService = require('./services/cron/cronService.js');
const { authMiddleware } = require('./middlewares/auth.js');
const { checkRole } = require('./middlewares/checkRoles.js');
const swaggerSetup = require('./swagger.js');

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/search', rateLimiter, searchRouter);
app.use("/api/games", gameRoutes);

swaggerSetup(app);

module.exports = app;