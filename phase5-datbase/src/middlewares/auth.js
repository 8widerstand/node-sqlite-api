const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || token !== "Bearer secret123") {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};

module.exports = auth;