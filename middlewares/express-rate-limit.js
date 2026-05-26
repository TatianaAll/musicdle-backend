import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 90,              // 90 requêtes par minute par IP
  message: { error: 'Trop de requêtes, réessaie dans une minute.' }
});