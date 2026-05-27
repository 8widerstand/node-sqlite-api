// ==========================================
// server.js: testing the connection to SQLite
// ==========================================

const express = require("express");
const app = express();


const db = require("./src/database/database");

console.log("Database initialised.");

// Une route simple pour tester
app.get("/", (req, res) => {
    res.json({ message: "Hello, SQLite is ready!" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});