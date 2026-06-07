const { z } = require("zod");

const createBookSchema = z.object({
    title: z
        .string({ message: "Title must be a string" })
        .min(1, "Title is required")
        .max(200, "Title is too long"),

    author: z
        .string({ message: "Author must be a string" })
        .min(1, "Author is required")
        .max(100, "Author name is too long"),

    year: z
        .number({ message: "Year must be a number" })
        .int("Year must be an integer")
        .min(0, "Year must be positive")
        .max(new Date().getFullYear(), "Year cannot be in the future")
        .optional(),

    available: z.boolean().optional(),
});

const updateBookSchema = createBookSchema;

module.exports = {
    createBookSchema,
    updateBookSchema,
};