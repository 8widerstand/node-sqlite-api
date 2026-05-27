const db = require("./src/database/database");


const insertStmt = db.prepare(`
  INSERT INTO books (title, author, year, available)
  VALUES (?, ?, ?, ?)
`);

// The "?" are PLACEHOLDERS: they should be replaced with the actual values.
const result = insertStmt.run("Dune", "Frank Herbert", 1965, 1);

console.log("Livre inséré ! Voici le résultat :");
console.log(result);

// --- Read all books ---
const allBooks = db.prepare("SELECT * FROM books").all();
console.log("\nTous les livres dans la base :");
console.log(allBooks);