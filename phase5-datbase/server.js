const express = require("express");
const app = express();

const logger = require("./src/middlewares/logger");
app.use(logger);

app.use(express.json());

const usersRoutes = require("./src/routes/usersRoutes");
const booksRoutes = require("./src/routes/booksRoutes");
app.use("/users", usersRoutes);
app.use("/books", booksRoutes);

const notFoundHandler = require("./src/middlewares/notFoundHandler");
app.use(notFoundHandler);

const errorHandler = require("./src/middlewares/errorHandler");
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});