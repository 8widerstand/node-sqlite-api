// ==========================================
// server.js
// Purpose: Start the application.
// - Configure Express
// - Map routes
// - Start the server
// ==========================================

const express = require("express");
const app = express();

const logger = require("./src/middlewares/logger");
app.use(logger);

// Global middleware for parsing JSON
app.use(express.json());

// import all routes
const booksRoutes = require("./src/routes/booksRoutes");
const usersRoutes = require("./src/routes/usersRoutes");

// the books routes are "mapped" to the /books prefix.
// All routes defined in booksRoutes will be accessible under /books.
app.use("/books", booksRoutes);
app.use("/users", usersRoutes);

// "Route not found" middleware (AFTER all routes)
const notFoundHandler = require("./src/middlewares/notFoundHandler");
app.use(notFoundHandler);

// Error handling middleware (ALWAYS LAST)
const errorHandler = require("./src/middlewares/errorHandler");
app.use(errorHandler);

// Starting the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log("\nAvailable Routes  :");
    console.log("  GET    /books                  → all books ");
    console.log("  GET    /books/:id              → on book per id");
    console.log("  GET    /books/available/list   → available books");
    console.log("  POST   /books                  → create book");
    console.log("  PUT    /books/:id              → update book");
    console.log("  DELETE /books/:id              → delete book");
});