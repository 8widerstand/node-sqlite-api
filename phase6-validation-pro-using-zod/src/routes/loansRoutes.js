const express = require("express");
const router = express.Router();

const loansController = require("../controllers/loansController");
const validateId = require("../middlewares/validateId");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const {createLoanSchema, returnLoanSchema} = require("../schemas/loanSchemas")

router.get("/active", loansController.getActiveLoans);
router.get("/user/:userId", loansController.getLoansByUser);

router.get("/", loansController.getAllLoans);
router.get("/:id", validateId, loansController.getLoanById);
router.post("/", auth, validate(createLoanSchema), loansController.createLoan);
router.patch("/:id/return", validateId, auth, validate(returnLoanSchema), loansController.returnLoan);
router.delete("/:id", validateId, auth, loansController.deleteLoan);

module.exports = router;