// ==========================================
// booksService.js
// Responsibility: BUSINESS LOGIC.
// - Validation rules
// - Business calculations
// - Coordination between models
// No “req” or “res” here; this is not about HTTP.
// ==========================================

const booksModel = require("../models/booksModel");

// get all books.
const getAllBooks = () => {
    return booksModel.findAll();
};

//get a book by id.
//"throw" an error if not found. The controller get them.
const getBookById = (id) => {
    const book = booksModel.findById(id);
    if (!book) {
        const error = new Error("Book not found");
        error.status = 404;
        throw error;
    }
    return book;
};

//get available books
const getAvailableBooks = () => {
    return booksModel.findAvailable();
};

//get popular loans
const getPopularBooks = () => {
    return booksModel.findPopular();
};


//create a book (with validation)
const createBook = (bookData) => {
    const {title, author, year, available} = bookData;

    const newBook = {
        title,
        author,
        year,
        available: available !== undefined ? available : true,
    }
    return booksModel.createBook(newBook);
}

//update a book
const updateBook = (id, bookData) => {
    const existing = booksModel.findById(id);
    if (!existing) {
        const error = new Error("Book not found");
        error.statusCode = 404;
        throw error;
    }

    const {title, author, year, available} = bookData;

    const updatedBook = {
        id: existing.id,
        title,
        author,
        year,
        available,
    }

    return booksModel.updateBook(updatedBook);
}

// delete a book
const deleteBook = (id) => {
    const success = booksModel.removeBook(id);
    if (!success) {
        const error = new Error("Book not found");
        error.statusCode = 404;
        throw error;
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    getAvailableBooks,
    getPopularBooks,
    createBook,
    updateBook,
    deleteBook,
};