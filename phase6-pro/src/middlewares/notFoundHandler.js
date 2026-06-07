// ==========================================
// notFoundHandler.js
// Middleware that is triggered when NO route matches.
// It should ALWAYS be placed AT THE END of the routes.
// ==========================================

const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        error: `Route ${req.method} ${req.url} not found`,
    });
};

module.exports = notFoundHandler;