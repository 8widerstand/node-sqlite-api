const loansService = require("../services/loansService");

const getAllLoans = (req, res, next) => {
    try {
        res.json(loansService.getAllLoans());
    } catch (error) {
        next(error);
    }
};

const getLoanById = (req, res, next) => {
    try {
        res.json(loansService.getLoanById(parseInt(req.params.id)));
    } catch (error) {
        next(error);
    }
};

const getLoansByUser = (req, res, next) => {
    try {
        res.json(loansService.getLoansByUser(parseInt(req.params.userId)));
    } catch (error) {
        next(error);
    }
};

const getActiveLoans = (req, res, next) => {
    try {
        res.json(loansService.getActiveLoans());
    } catch (error) {
        next(error);
    }
};

const createLoan = (req, res, next) => {
    try {
        const newLoan = loansService.createLoan(req.body);
        res.status(201).json(newLoan);
    } catch (error) {
        next(error);
    }
};

const returnLoan = (req, res, next) => {
    try {
        const updated = loansService.returnLoan(req.params.id, req.body.return_date);
        res.json(updated);
    } catch (error) {
        next(error);
    }
};

const deleteLoan = (req, res, next) => {
    try {
        loansService.deleteLoan(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
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