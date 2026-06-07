// ==========================================
// logger.js
// Middleware that logs every incoming request.
// ==========================================

const logger = (req, res, next) => {
    // the date is displayed, the HTTP method and the URL.
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);

    // VERY IMPORTANT: call `next()` to move on to the next middleware/route.
    // If you forget to call `next()`, the request remains BLOCKED and the client waits indefinitely.
    next();
};

module.exports = logger;