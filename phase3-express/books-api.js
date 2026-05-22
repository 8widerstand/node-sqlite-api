const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

const books = [
    {id: 1, title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", year: 1943, available: true},
    {id: 2, title: "1984", author: "George Orwell", year: 1949, available: false},
    {id: 3, title: "Orgueil et Préjugés", author: "Jane Austen", year: 1813, available: true},
    {id: 4, title: "L'Étranger", author: "Albert Camus", year: 1942, available: false}
];
let nextIndex = 4;

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({error: 'the Id must be a positive number'});
    }

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({error: 'Book not found'});
    }

    res.json(book);
});

app.post('/books', (req, res) => {
    const {title, author, year, available} = req.body;

    if (!title || !author || year === undefined) {
        return res.status(400).json({error: "'The field 'title', 'author' and 'year' are required"});
    }

    if (typeof year !== "number" || year < 0) {
        return res.status(400).json({error: "the year must be a positive number",});
    }

    const newBook = {
        id: nextIndex,
        title: title,
        author: author,
        year: year,
        available: available !== undefined ? available : true,
    }

    books.push(newBook);
    nextIndex++;
    res.send(201).json(books);
});

app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({error: 'the Id must be number'});
    }

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({error: 'Book not found'});
    }

    const {title, author, year, available} = req.body;

    if (!title || !author || year === undefined) {
        return res.status(400).json({error: "'The field 'title', 'author' and 'year' are required"});
    }

    if (typeof year !== "number" || year < 0) {
        return res.status(400).json({error: "the year must be a positive number",});
    }

    books[bookIndex] = {
        id: nextIndex,
        title: title,
        author: author,
        year: year,
        available: available !== undefined ? available : true,
    };

    res.json(books);
});

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({error: 'the id must be number'});
    }

    const index = books.findIndex((p) => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Produit non trouvé" });
    }

    books.splice(index, 1);
    res.send(204).send();
})

app.listen(PORT, () => {
    console.log(`  Serveur started on http://localhost:${PORT}`);
    console.log("  Routes CRUD disponibles :");
    console.log("  GET    /books      → lister");
    console.log("  GET    /books/:id  → lire un");
    console.log("  POST   /books      → créer");
    console.log("  PUT    /books/:id  → modifier");
    console.log("  DELETE /books/:id  → supprimer");
});

