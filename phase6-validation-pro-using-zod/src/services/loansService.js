const loansModel = require("../models/loansModel");
const usersModel = require("../models/usersModel");
const booksModel = require("../models/booksModel");

const getAllLoans = () => loansModel.findAll();

const getLoanById = (id) => {
    const loan = loansModel.findById(id);
    if (!loan) {
        const error = new Error(`Loan with id ${id} not found`);
        error.statusCode = 404;
        throw error;
    }
    return loan;
};

const getLoansByUser = (userId) => {
    // On vérifie d'abord que l'utilisateur existe
    const user = usersModel.findById(userId);
    if (!user) {
        const error = new Error(`User with id ${userId} not found`);
        error.statusCode = 404;
        throw error;
    }
    return loansModel.findByUser(userId);
};

const getActiveLoans = () => loansModel.findActive();

const createLoan = (loanData) => {
    const { user_id, book_id, borrow_date, return_date } = loanData;

    const user = usersModel.findById(user_id);
    if (!user) {
        const error = new Error(`User with id ${user_id} does not exist`);
        error.statusCode = 400;
        throw error;
    }

    const book = booksModel.findById(book_id);
    if (!book) {
        const error = new Error(`Book with id ${book_id} does not exist`);
        error.statusCode = 400;
        throw error;
    }

    return loansModel.create({ user_id, book_id, borrow_date, return_date });
};

const returnLoan = (id, returnDate) => {
    const updated = loansModel.markReturned(id, returnDate);

    if (!updated) {
        const error = new Error(`Loan with id ${id} not found`);
        error.statusCode = 404;
        throw error;
    }
    return updated;
};

const deleteLoan = (id) => {
    const success = loansModel.remove(id);
    if (!success) {
        const error = new Error(`Loan with id ${id} not found`);
        error.statusCode = 404;
        throw error;
    }
};

module.exports = {
    getAllLoans,
    getLoanById,
    getLoansByUser,
    getActiveLoans,
    createLoan,
    returnLoan,
    deleteLoan,
};