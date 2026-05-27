// ==========================================
// booksController.js
// Responsibility: acts as the interface between HTTP and the business logic.
// - Receives the request (req)
// - Calls the services
// - Constructs the response (res)
// ==========================================

const booksService = require('../services/booksService');
// The third parameter, ‘next’, allows the error to be passed to the errorHandler.

//GET /books
const getAllBooks = (req, res, next) => {
    try {
        const books = booksService.getAllBooks();
        res.json(books);
    } catch (error) {
        next(error);
    }
};

//GET /books/:id
const getBookById = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const book = booksService.getBookById(id);
        res.json(book);
    } catch (error) {
        next(error);
    }
};

// GET /books/available
const getAvailableBooks = (req, res, next) => {
    try {
        const availableBooks = booksService.getAvailableBooks();
        res.json(availableBooks);
    } catch (error) {
      next(error);
    }
}

// POST /books
const createBook = (req, res, next) => {
    try {
        const bookData = req.body;
        const book = booksService.createBook(bookData);
        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
}

// POST  /books/:id
const updateBook = (req, res, next) => {
    try {
        const bookId = parseInt(req.params.id);
        const bookData = req.body;
        const book = booksService.updateBook(bookId, bookData);
        res.status(201).json(book);
    } catch (error) {
       next(error);
    }
}

// Delete  /books/:id
const deleteBook = (req, res, next) => {
    try {
        const bookId = parseInt(req.params.id);
        booksService.deleteBook(bookId);
        res.status(204).send();
    } catch (error) {
      next(error);
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    getAvailableBooks,
    createBook,
    updateBook,
    deleteBook,
};