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
const validate = require("../middlewares/validate");
const {createBookSchema, updateBookSchema} = require("../schemas/bookSchemas");

//  Specific routes BEFORE the configured routes
router.get("/available/list", booksController.getAvailableBooks);
router.get("/popular", booksController.getPopularBooks);

// Main routes
router.get("/", booksController.getAllBooks);
router.post("/", auth, validate(createBookSchema), booksController.createBook);

router.get("/:id", validateId, booksController.getBookById);
router.put("/:id", validateId, auth, validate(updateBookSchema), booksController.updateBook);
router.delete("/:id", validateId, auth, booksController.deleteBook);

module.exports = router;