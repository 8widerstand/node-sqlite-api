// ==========================================
// swagger.js
// Swagger configuration to generate the documentation.
// ==========================================

const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    // OpenAPI version 3.0 spec
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "REST API for managing a library (books, users, loans)",
            contact: {
                name: "Your name",
                email: "your.email@example.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],

        // Definition of a Bearer token security system.
        // We will reuse it for protected routes.
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                },
            },
        },
    },

    // The files where Swagger comments should be searched.
    // The pattern uses a "glob expression": "**" = any folder, "*.js" = all .js files.
    apis: ["./src/routes/*.js", "./src/schemas/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;