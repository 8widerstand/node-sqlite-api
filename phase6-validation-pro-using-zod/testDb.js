const db = require("./src/database/database");


const insertBookStmt = db.prepare(`
    INSERT INTO books (title, author, year, available)
    VALUES (?, ?, ?, ?)
`);

const insertUserStmt = db.prepare(`
    INSERT INTO users (name, email, age)
    VALUES (?, ?, ?)
`);

// The "?" are PLACEHOLDERS: they should be replaced with the actual values.
const result = insertBookStmt.run("Dune", "Frank Herbert", 1965, 1);
const result2 = insertUserStmt.run("Alice Dupont", "alice@email.com", 25);

console.log(result);
console.log(result2);

// --- Read all books ---
const allBooks = db.prepare("SELECT * FROM books").all();
console.log(allBooks);

console.log("\n--- All users ---");
console.log(db.prepare("SELECT * FROM users").all());

// --- EMAIL UNIQUENESS TEST ---
console.log("\n--- Email Duplicate Check ---");
try {
    insertUserStmt.run("Bob", "alice@email.com", 30);
    console.log("Insertion successful (abnormal!)");
} catch (err) {
    console.log("Expected error :", err.message);
}