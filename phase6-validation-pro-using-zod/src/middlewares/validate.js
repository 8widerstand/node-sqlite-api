// ==========================================
// validate.js
// GENERIC middleware that takes a Zod schema as a parameter
// and validates req.body against this schema.
// ==========================================

// "validate" is a "factory": it takes a schema as a parameter and
// returns a middleware adapted to this schema.
// This is a very commonly used pattern in Express: the "middleware factory".

const validate = (schema) => {
    return (req, res, next) => {
        // safeParse: validates without throwing. Returns { success, data } or { success, error }.
        const result = schema.safeParse(req.body);

        if (!result.success) {
            // If validation fails, the errors are transformed into clear messages.
            const errors = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));

            return res.status(400).json({
                error: "Validation failed",
                details: errors,
            });
        }

        // req.body with the validated and "cleaned" version is REPLACED.
        // Zod removes unknown fields and applies default values.
        req.body = result.data;

        next();
    };
};

module.exports = validate;