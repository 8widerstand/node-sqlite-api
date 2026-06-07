const { z } = require("zod");

// Regex for validating a date with format YYYY-MM-DD
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const createLoanSchema = z.object({
    user_id: z
        .number({ message: "user_id must be a number" })
        .int("user_id must be an integer")
        .positive("user_id must be positive"),

    book_id: z
        .number({ message: "book_id must be a number" })
        .int("book_id must be an integer")
        .positive("book_id must be positive"),

    borrow_date: z
        .string({ message: "borrow_date must be a string" })
        .regex(dateRegex, "borrow_date must be in format YYYY-MM-DD"),

    return_date: z
        .string({ message: "return_date must be a string" })
        .regex(dateRegex, "return_date must be in format YYYY-MM-DD")
        .optional(),
});

const returnLoanSchema = z.object({
    return_date: z
        .string({ message: "return_date must be a string" })
        .regex(dateRegex, "return_date must be in format YYYY-MM-DD"),
});

module.exports = {
    createLoanSchema,
    returnLoanSchema,
};