// ==========================================
// server.js : Full CRUD API with Express
// ==========================================

const express = require("express");
const app = express();

//  ESSENTIAL MIDDLEWARE
// This line tells Express: "If you receive JSON in the body, parse it automatically and store it in req.body."
// Without this line, req.body will be undefined for POST/PUT/PATCH requests.

app.use(express.json());

// the in-memory ‘database’
let products = [
    { id: 1, name: "Clavier", price: 89.99, stock: 15 },
    { id: 2, name: "Souris", price: 29.99, stock: 50 },
    { id: 3, name: "Café", price: 12.50, stock: 100 },
];

// Variable for automatically generating the next ID.
// In a real database, the ID would be managed automatically.
let nextId = 4;


// ============================================================
// READ - Read data
// ============================================================

// --- GET /products : list all products ---
app.get("/products", (req, res) => {
    res.json(products);
});

// --- GET /products/:id : retrieve a specific product ---
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "L'id doit être un nombre" });
    }

    const product = products.find((p) => p.id === id);

    if (!product) {
        return res.status(404).json({ error: "Produit non trouvé" });
    }

    res.json(product);
});


// ============================================================
// CREATE - Create a new resource (POST)
// ============================================================

// --- POST /products: create a new product ---
app.post("/products", (req, res) => {
    // Thanks to app.use(express.json()), req.body already contains the JSON object that was sent.
    // No need for ‘data’ and ‘end’ as with native HTTP!
    const { name, price, stock } = req.body;

    // VALIDATION: manual (we will look at dedicated tools in Phase 6)
    // The customer must provide at least the name and the price.
    if (!name || price === undefined) {
        return res.status(400).json({
            error: "Les champs 'name' et 'price' sont obligatoires",
        });
    }

    // The price should be a positive number
    if (typeof price !== "number" || price < 0) {
        return res.status(400).json({
            error: "Le prix doit être un nombre positif",
        });
    }

    // Creating a new product
    const newProduct = {
        id: nextId,
        name: name,
        price: price,
        stock: stock !== undefined ? stock : 0,   //default stock = 0 if non provided
    };

    // Adding in the array
    products.push(newProduct);
    nextId++;

    // Status 201 Created : The created resource is returned.
    // Best practice : resend the new resource (with its new id) to the client.
    res.status(201).json(newProduct);
});


// ============================================================
// UPDATE - Update a resource (PUT)
// ============================================================

// --- PUT /products/:id : replace a product ---
app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "L'id doit être un nombre" });
    }

    // We look for the product index in the table.
    // findIndex return the index (0, 1, 2...) or -1 if not found.
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Produit non trouvé" });
    }

    const { name, price, stock } = req.body;

    // Validation (same logic like in POST)
    if (!name || price === undefined) {
        return res.status(400).json({
            error: "Les champs 'name' et 'price' sont obligatoires",
        });
    }

    // The product is COMPLETELY replaced (that's what the PUT method does).
    // We keep the existing ID; that's important.
    const updatedProduct = {
        id: id,
        name: name,
        price: price,
        stock: stock !== undefined ? stock : 0,
    };

    products[index] = updatedProduct;

    res.json(updatedProduct);
});


// ============================================================
// DELETE - Delete a resource
// ============================================================

// --- DELETE /products/:id : Delete a product ---
app.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "L'id doit être un nombre" });
    }

    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Produit non trouvé" });
    }

    //  splice(index, 1) removes 1 element starting from the specified index.
    products.splice(index, 1);

    // 204 No Content : Successful, but no data to return.
   //  Best practice for DELETE.
    res.status(204).send();
});


// ============================================================
// Starting the server
// ============================================================

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`  Serveur démarré sur http://localhost:${PORT}`);
    console.log("  Routes CRUD disponibles :");
    console.log("  GET    /products      → lister");
    console.log("  GET    /products/:id  → lire un");
    console.log("  POST   /products      → créer");
    console.log("  PUT    /products/:id  → modifier");
    console.log("  DELETE /products/:id  → supprimer");
});