// ==========================================
// booksRoutes.js
// Purpose: to map URLs to controllers.
// We use an Express “Router”: a mini-app that we will attach elsewhere.
// ==========================================


const express = require("express");
const router = express.Router();

const booksController = require("../controllers/booksController");

//  Specific routes BEFORE the configured routes
router.get("/available/list", booksController.getAvailableBooks);

// Main routes
router.get("/", booksController.getAllBooks);
router.get("/:id", booksController.getBookById);
router.post("/", booksController.createBook);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;