const rateLimit = require('express-rate-limit');

module.exports = {
  rateLimiter: rateLimit({
    windowMs: 60 * 1000,  // 1 minute
    max: 90,              // 90 requêtes par minute par IP
    message: { error: 'Trop de requêtes, réessaie dans une minute.' }
  })
};