// ==========================================
// userSchemas.js
// Zod schemas for user validation.
// ==========================================

const { z } = require("zod");

// --- Schema for CREATING a user ---
// Define the rules for each field.
const createUserSchema = z.object({
    name: z
        .string({ message: "Name must be a string" })
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),

    email: z
        .string({ message: "Email must be a string" })
        .email("Invalid email format"),

    age: z
        .number({ message: "Age must be a number" })
        .int("Age must be an integer")
        .min(0, "Age must be positive")
        .max(120, "Age must be less than 120")
        .optional(),                                  // optional = can be absent
});

// --- Schema for UPDATING a user ---
// For a PUT request (full replacement), the same schema is kept as for creation.
const updateUserSchema = createUserSchema;

module.exports = {
    createUserSchema,
    updateUserSchema,
};