const express = require('express');
const app = express()

const users = [
    {id: 1, name: "Alice"},
    {id: 2, name: "Bob"},
];

app.get('/', (request, response) => {
    response.send("Welcome to my home page");
});

app.get("/about", (request, response) => {
    response.send("Hello! I'm your first express server");
});

app.get("/users", (request, response) => {
    response.json(users);
})

app.get("/users/:id", (request, response) => {
    const userId = parseInt(request.params.id);
    const user = users.find(user => user.id === userId);

    if (!user) {
        response.status(404).send("User not found");
    }
    response.send(user);
});

app.get("/search", (request, response) => {
    console.log("Query reçue :", request.query);
    let result = users;
    if (request.query.name){
        result = result.filter((user) => user.name.toLowerCase().includes(request.query.name.toLowerCase()));
    }
    response.send(result);
})

app.listen(3000, () => {
    console.log("🚀 Serveur Express démarré sur http://localhost:3000");
    console.log("\nRoutes disponibles :");
    console.log("  GET /users         → tous les utilisateurs");
    console.log("  GET /users/:id     → un utilisateur par id (essaie /users/1)");
    console.log("  GET /search?name=  → recherche par nom (essaie /search?name=al)");
});