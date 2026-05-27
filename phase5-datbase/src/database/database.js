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
// The option { verbose: console.log } displays all SQL queries in the terminal.
const db = new Database(dbPath, { verbose: console.log });

// We'll create the ‘books’ table if it doesn't already exist.
// This is what's known as a ‘migration’ in simple terms.
db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year INTEGER,
    available INTEGER NOT NULL DEFAULT 1
  )
`);

// On exporte l'objet db pour pouvoir l'utiliser dans les models.
module.exports = db;