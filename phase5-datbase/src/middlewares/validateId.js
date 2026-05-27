// ==========================================
// validateId.js
// Checks that req.params.id is a valid number.
// If so, converts it and continues. If not, returns 400.
// ==========================================

const validateId = (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "The id must be a number" });
    }

    // Replace `req.params.id` with its numeric equivalent.
    // This way, in the controller,`req.params.id` can be used directly without having to parse it again.
    req.params.id = id;

    next();
};

module.exports = validateId;