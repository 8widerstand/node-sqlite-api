// server.js: with complete HTTP security

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

// SECURITY MIDDLEWARES (at the top, before everything else)

// Helmet: adds about ten security headers.
// A single line to enable all default protections.
app.use(helmet());

// CORS: allow requests from your frontend.
// For development, we allow everything (origin: "*").
// In production, we will replace it with the exact URL of your frontend.
app.use(cors({
    origin: "*",                                  // to restrict in production!
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "10kb" }));

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),       // time elapsed since start-up
        timestamp: new Date().toISOString(),
    });
});

//  GLOBAL Rate Limiting: 100 requests / 15 minutes per IP.
// This is generous; it only blocks bots that spam requests.
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,                     // 15 minutes in milliseconds
    max: 100,                                     // 100 requests per window
    message: {                                    // Response when the limit is exceeded
        error: "Too many requests, please try again later.",
    },
    standardHeaders: true,                        // Return the RateLimit-* headers
    legacyHeaders: false,                         // Do not return the old X-RateLimit-* headers
});

app.use(generalLimiter);

// Request logger
const logger = require("./src/middlewares/logger");
app.use(logger);

// JSON parser WITH size limit (security against JSON bombs)
app.use(express.json({ limit: "10kb" }));


// ==========================================
// ROUTES

const booksRoutes = require("./src/routes/booksRoutes");
const usersRoutes = require("./src/routes/usersRoutes");
const loansRoutes = require("./src/routes/loansRoutes");

app.use("/books", booksRoutes);
app.use("/users", usersRoutes);
app.use("/loans", loansRoutes);

const notFoundHandler = require("./src/middlewares/notFoundHandler");
app.use(notFoundHandler);

const errorHandler = require("./src/middlewares/errorHandler");
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Secure server started at http://localhost:${PORT}`);
});