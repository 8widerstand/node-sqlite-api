// ==========================================
// db.js
// Purpose: to create and provide access to the SQLite database.
// This file is imported wherever you need to access the database.
// ==========================================

const Database = require("better-sqlite3");
const path = require("path");

// The path to the database file should be defined as follows .
// __dirname is a special Node.js variable: the directory containing the current file.
// We go up two levels to reach the project root.
const dbPath = path.join(__dirname, "..", "..", "data.db");

// The database should be open (or created).
// If the "data.db" file does not exist, SQLite creates it AUTOMATICALLY.
const db = new Database(dbPath);

// It'll create the "books" table if it doesn't already exist.
// This is what's known as a "migration" in simple terms.
db.exec(`
    CREATE TABLE IF NOT EXISTS books
    (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        title     TEXT    NOT NULL,
        author    TEXT    NOT NULL,
        year      INTEGER,
        available INTEGER NOT NULL DEFAULT 1
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS users
    (
        id    INTEGER PRIMARY KEY AUTOINCREMENT,
        name  TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        age   INTEGER
    )
`);

const bookCount = db.prepare("SELECT COUNT(*) AS count FROM books").get().count;

if (bookCount === 0) {
    const insertSeed = db.prepare(`
        INSERT INTO books (title, author, year, available)
        VALUES (?, ?, ?, ?)
    `);

    const insertMany = db.transaction((books) => {
        for (const book of books) {
            insertSeed.run(book.title, book.author, book.year, book.available);
        }
    });

    insertMany([
        { title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", year: 1943, available: 1 },
        { title: "1984", author: "George Orwell", year: 1949, available: 0 },
        { title: "Orgueil et Préjugés", author: "Jane Austen", year: 1813, available: 1 },
        { title: "L'Étranger", author: "Albert Camus", year: 1942, available: 0 },
    ]);

    console.log("✅ Données initiales insérées.");
}

//  Export the db object so that it can be used it in the models.
module.exports = db;