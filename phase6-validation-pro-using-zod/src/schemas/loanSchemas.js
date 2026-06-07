const {z} = require("zod");

const createLoanSchema = z.object({
    user_id: z
        .number({message: "Id must be a number"})
        .int("Id must be a integer")
        .positive( "Id must be a positive integer")
    ,
    book_id: z
        .number({message: "Id must be a number"})
        .int("Id must be a integer")
        .min(1, "Id must be a positive integer")
    ,
    borrow_date: z
        .string({message: "borrow date must be a string"})
        .min(10, "Borrow date is required")
        .max(new Date().getFullYear(), "borrow date cannot be in the future")
    ,
    return_date: z
        .string({message: "return date must be a string"})
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format YYYY-MM-DD")
    ,
});

const returnLoanSchema = z.object({
    return_date: z
        .string({message: "return date must be a string"})
        .min(10, "return date is required")
        .max(new Date().getFullYear(), "return date cannot be in the future")
    ,
})

module.exports = {
    createLoanSchema,
    returnLoanSchema,
};