// ==========================================
// booksRoutes.js
// Purpose: to map URLs to controllers.
// We use an Express “Router”: a mini-app that we will attach elsewhere.
// ==========================================


const express = require("express");
const router = express.Router();

const booksController = require("../controllers/booksController");
const validateId = require("../middlewares/validateId");
const auth = require("../middlewares/auth");

//  Specific routes BEFORE the configured routes
router.get("/available/list", booksController.getAvailableBooks);
router.get("/popular", booksController.getPopularBooks);

// Main routes
router.get("/", booksController.getAllBooks);
router.post("/", auth, booksController.createBook);

router.get("/:id", validateId, booksController.getBookById);
router.put("/:id", validateId, auth, booksController.updateBook);
router.delete("/:id", validateId, auth, booksController.deleteBook);

module.exports = router;