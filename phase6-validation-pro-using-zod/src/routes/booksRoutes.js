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
const strictLimiter = require("../middlewares/strictLimiter");
const {createBookSchema, updateBookSchema} = require("../schemas/bookSchemas");


/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Le Petit Prince"
 *         author:
 *           type: string
 *           example: "Antoine de Saint-Exupéry"
 *         year:
 *           type: integer
 *           example: 1943
 *         available:
 *           type: boolean
 *           example: true
 *     BookInput:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         title:
 *           type: string
 *           example: "Dune"
 *         author:
 *           type: string
 *           example: "Frank Herbert"
 *         year:
 *           type: integer
 *           example: 1965
 *         available:
 *           type: boolean
 *           example: true
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Resource not found"
 */


/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", booksController.getAllBooks);


/**
 * @swagger
 * /books/available/list:
 *   get:
 *     summary: Get only available books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of available books
 */
router.get("/available/list", booksController.getAvailableBooks);


/**
 * @swagger
 * /books/popular:
 *   get:
 *     summary: Get the most borrowed books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List sorted by popularity
 */
router.get("/popular", booksController.getPopularBooks);


/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by its id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book id
 *     responses:
 *       200:
 *         description: The found book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateId, booksController.getBookById);


/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       201:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authenticated
 */
router.post("/", auth, validate(createBookSchema), booksController.createBook);


/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       200:
 *         description: Book updated
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Book not found
 */
router.put("/:id", validateId, auth, validate(updateBookSchema), booksController.updateBook);


/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Book deleted (no content)
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Book not found
 *       429:
 *         description: Too many attempts
 */
router.delete("/:id", validateId, auth, strictLimiter, booksController.deleteBook);


module.exports = router;