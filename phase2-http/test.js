
const http = require("http");

const users = [
    {id: 1, name: "Alice"},
    {id: 2, name: "Bob"},
];

const products = [
    { id: 1, name: "Ordinateur Portable", price: 899.99, stock: 15 },
    { id: 2, name: "Souris Sans Fil", price: 29.99, stock: 50 },
    { id: 3, name: "Clavier Mécanique", price: 129.99, stock: 25 }
];

const server = http.createServer((request, response) => {
    const {method, url} = request;

    console.log(`📥 ${method} ${url}`);

    // --- GET /users : list all users ---

    if (method === "GET" && url === "/users") {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(JSON.stringify(users));
        return;
    }

    // --- POST /users : create a new user  ---
    if (method === "POST" && url === "/users") {
        // For POST requests, we need to ‘read’ the request body (the JSON sent).
        //  The body arrives in CHUNKS. we need to piece them together.
        // THIS is what makes the native HTTP module a pain to use.
        let body = "";
        // Whenever a track is received, we add it to our queue.
        request.on("data", (chunk) => {
            body += chunk.toString();
        });

        //  When the client has finished sending the body:
        request.on("end", () => {
            try {
                // We parse the received JSON to convert it into an object.
                const newUser = JSON.parse(body);
                // We assign it an ID based on the current size of the array+1.
                newUser.id = users.length + 1;
                users.push(newUser);
                // 201 Created : on a bien créé la ressource.
                response.writeHead(201, {"Content-Type": "application/json"});
                response.end(JSON.stringify(newUser));
            } catch (error) {
                //  If the JSON sent is malformed.
                response.writeHead(400, {"Content-Type": "application/json"});
                response.end(JSON.stringify({error: "JSON invalide"}));
            }
        });
        return;
    }
    if (method === "GET" && url === "/products") {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(JSON.stringify(products));
        return;
    }
    if (method === "GET" && url === "/health") {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(JSON.stringify({"status": "ok", "timestamp": new Date().toISOString() }));
        return;
    }


    // --- No matches found ---
    response.writeHead(404, {"Content-Type": "application/json"});
    response.end(JSON.stringify({error: "Route non trouvée"}));
});

server.listen(3000, () => {
    console.log("   Serveur démarré sur http://localhost:3000");
    console.log("   Routes disponibles :");
    console.log("   -GET  /users  → liste les utilisateurs");
    console.log("   -POST /users  → crée un utilisateur");
});