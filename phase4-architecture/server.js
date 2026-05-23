// ==========================================
// server.js
// Purpose: Start the application.
// - Configure Express
// - Map routes
// - Start the server
// ==========================================

const express = require("express");
const app = express();

// Global middleware for parsing JSON
app.use(express.json());

// import all routes
const booksRoutes = require("./src/routes/booksRoutes");

// We “map” the books routes to the /books prefix.
// All routes defined in booksRoutes will be accessible under /books.
app.use("/books", booksRoutes);

// Starting the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log("\nRoutes disponibles :");
    console.log("  GET    /books                  → all books ");
    console.log("  GET    /books/:id              → on book per id");
    console.log("  GET    /books/available/list   → available books");
    console.log("  POST   /books                  → create book");
    console.log("  PUT    /books/:id              → update book");
    console.log("  DELETE /books/:id              → delete book");
});