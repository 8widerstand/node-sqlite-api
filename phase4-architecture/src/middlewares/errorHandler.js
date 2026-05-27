// ==========================================
// errorHandler.js
// Special middleware that CATCHES all errors from routes/controllers.
//
// IMPORTANT DIFFERENCE:
// An error middleware takes 4 arguments (err, req, res, next),
// not 3 like other middlewares.
// Express automatically detects 4-argument middlewares
// and treats them as ‘error handlers’.
// ==========================================

const errorHandler = (err, req, res, next) => {
    // the error is logged on the server side for debugging purposes
    console.error(`Error caught : ${err.message}`);

    // Send a proper response to the client
    // If the error has a status code (which we have defined in the services), we use it.
    // Otherwise, it is an unexpected error: 500 Internal Server Error.
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        error: message,
    });
};

module.exports = errorHandler;