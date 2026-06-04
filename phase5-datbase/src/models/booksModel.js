// ==========================================
// booksModel.js — SQLite VERSION
// Responsibility: data access via SQL.
// The INTERFACE (the exported functions) does NOT change.
// Only the IMPLEMENTATION changes.
// ==========================================

const db = require("../database/database");

// PREPARE the statements ONLY ONCE, when the module is loaded.
// This is faster than preparing them on every call.
const findAllStmt = db.prepare("SELECT * FROM books");
const findByIdStmt = db.prepare("SELECT * FROM books WHERE id = ?");
const findAvailableStmt = db.prepare("SELECT * FROM books WHERE available = 1");
const insertStmt = db.prepare(`
  INSERT INTO books (title, author, year, available)
  VALUES (?, ?, ?, ?)
`);
const updateStmt = db.prepare(`
  UPDATE books
  SET title = ?, author = ?, year = ?, available = ?
  WHERE id = ?
`);
const deleteStmt = db.prepare("DELETE FROM books WHERE id = ?");

// Helper to convert "available" (INTEGER 0/1) into a JS boolean.
// SQLite stores 0/1, JavaScript prefers true/false.
const formatBook = (book) => {
    if (!book) return null;
    return {
        ...book,
        available: book.available === 1,
    };
};

// --- Functions exposed to the service ---
// Note: EXACTLY the same signatures as before.
// The service will not notice anything.

const findAll = () => {
    const books = findAllStmt.all();        // .all() for multiple rows
    return books.map(formatBook);
};

const findById = (id) => {
    const book = findByIdStmt.get(id);       // .get() for a single row
    return formatBook(book);                  // undefined → null
};

const findAvailable = () => {
    const books = findAvailableStmt.all();
    return books.map(formatBook);
};

const createBook = (bookData) => {
    const { title, author, year, available } = bookData;

    // We convert the JS boolean into an INTEGER for SQLite (true → 1, false → 0).
    const availableInt = available ? 1 : 0;

    // .run() returns { changes, lastInsertRowid }
    const result = insertStmt.run(title, author, year, availableInt);

    // We return the freshly created book with its id
    return findById(result.lastInsertRowid);
};

const updateBook = (id, bookData) => {
    const { title, author, year, available } = bookData;
    const availableInt = available ? 1 : 0;

    const result = updateStmt.run(title, author, year, availableInt, id);

    // If no row was modified, it means the id does not exist
    if (result.changes === 0) return null;

    return findById(id);
};

const removeBook = (id) => {
    const result = deleteStmt.run(id);
    return result.changes > 0;   // true if something was deleted
};

module.exports = {
    findAll,
    findById,
    findAvailable,
    createBook,
    updateBook,
    removeBook,
};