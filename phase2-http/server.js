// ==========================================
// server.js : server with multiple routes
// ==========================================

const http = require("http");

const server = http.createServer((request, response) => {
    console.log(`📥 ${request.method} ${request.url}`);

    // The route will be based on the requested URL.
    // request.url contains the requested path (e.g. "/", "/about", "/users").

    if (request.url === "/") {
        // Home page
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end("Bienvenue sur la page d'accueil !");
    } else if (request.url === "/about") {
        // "About" page
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end("Je suis un serveur Node.js natif.");
    } else if (request.url === "/users") {
        // A "dummy" API that returns JSON
        response.writeHead(200, {"Content-Type": "application/json"});

        // The body of a reply is ALWAYS text.
        // To send JSON, a convertion of the object using JSON.stringify is needed.
        const users = [
            {id: 1, name: "Alice"},
            {id: 2, name: "Bob"},
        ];
        response.end(JSON.stringify(users));
    } else {
        //  // No route matches: a 404 error is returned.
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.end("404 - Page non trouvée");
    }
});

server.listen(3000, () => {
    console.log(" Serveur started on http://localhost:3000");
    console.log("   Routes available :");
    console.log("   - GET /");
    console.log("   - GET /about");
    console.log("   - GET /users");
});