import express from 'express';
import { renderGame, submitScore, getLeaderboard } from '../controllers/game.controller.js';
import { createRateLimitMiddleware, rateLimitConfigs } from '../middlewares/rateLimiter.js';

const gameRouter = express.Router();

// Crear middlewares de rate limiting para diferentes endpoints
const submitScoreLimiter = createRateLimitMiddleware(rateLimitConfigs.submitScore);
const leaderboardLimiter = createRateLimitMiddleware(rateLimitConfigs.leaderboard);

// Rutas públicas (sin rate limit)
gameRouter.get('/', renderGame);

// Rutas de API con rate limiting
gameRouter.post('/api/submit-score', submitScoreLimiter, submitScore);
gameRouter.get('/api/leaderboard', leaderboardLimiter, getLeaderboard);

export default gameRouter;
