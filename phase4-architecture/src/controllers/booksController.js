// ==========================================
// booksController.js
// Responsibility: acts as the interface between HTTP and the business logic.
// - Receives the request (req)
// - Calls the services
// - Constructs the response (res)
// ==========================================

const booksService = require('../services/booksService');

//GET /books
const getAllBooks = (req, res) => {
    try {
        const books = booksService.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
};

//GET /books/:id
const getBookById = (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
        if (isNaN(bookId)) {
            res.status(400).json({error: 'The id must be a number'});
        }
        const book = booksService.getBookById(bookId);
        res.json(book);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
};
// GET /books/available
const getAvailableBooks = (req, res) => {
    try {
        const availableBooks = booksService.getAvailableBooks();
        res.json(availableBooks);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

// POST /books
const createBook = (req, res) => {
    try {
        const bookData = req.body;
        const book = booksService.createBook(bookData);
        res.status(201).json(book);
    }catch(error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

// POST  /books/:id
const updateBook = (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        const bookData = req.body;
        if (isNaN(bookId)) {
            res.status(400).json({error: 'The id must be a number'});
        }
        const book = booksService.updateBook(bookId, bookData);
        res.status(201).json(book);
    }catch(error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

// Delete  /books/:id
const deleteBook = (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        if (isNaN(bookId)) {
            res.status(400).json({error: 'The id must be a number'});
        }
        booksService.deleteBook(bookId);
        res.status(204).send();
    }catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
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