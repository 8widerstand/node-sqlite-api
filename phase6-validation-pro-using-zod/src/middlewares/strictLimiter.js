// ==========================================
// strictLimiter.js
// Strict rate limiter for sensitive routes
// (login, register, critical operations).
// ==========================================

const rateLimit = require("express-rate-limit");

const strictLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,         // 15 minutes
    max: 5,                            // 5 attempts MAX
    message: {
        error: "Too many attempts. Please wait 15 minutes.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = strictLimiter;