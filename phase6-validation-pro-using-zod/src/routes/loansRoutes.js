// ==========================================
// loansRoutes.js
// Purpose: to map URLs to controllers.
// We use an Express “Router”: a mini-app that we will attach elsewhere.
// ==========================================

const express = require("express");
const router = express.Router();

const loansController = require("../controllers/loansController");
const validateId = require("../middlewares/validateId");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const {createLoanSchema, returnLoanSchema} = require("../schemas/loanSchemas")


/**
 * @swagger
 * components:
 *   schemas:
 *     Loan:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 1
 *         bookId:
 *           type: integer
 *           example: 2
 *         loanDate:
 *           type: string
 *           format: date
 *           example: "2026-06-07"
 *         returnDate:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: null
 *         returned:
 *           type: boolean
 *           example: false
 *     LoanInput:
 *       type: object
 *       required:
 *         - userId
 *         - bookId
 *       properties:
 *         userId:
 *           type: integer
 *           example: 1
 *         bookId:
 *           type: integer
 *           example: 2
 *     ReturnLoanInput:
 *       type: object
 *       properties:
 *         returnDate:
 *           type: string
 *           format: date
 *           example: "2026-06-07"
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Resource not found"
 */


/**
 * @swagger
 * /loans/active:
 *   get:
 *     summary: Get only active loans
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: List of active loans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 */
router.get("/active", loansController.getActiveLoans);


/**
 * @swagger
 * /loans/user/{userId}:
 *   get:
 *     summary: Get loans by user
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user id
 *     responses:
 *       200:
 *         description: List of loans for this user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 *       404:
 *         description: User not found
 */
router.get("/user/:userId", loansController.getLoansByUser);


/**
 * @swagger
 * /loans:
 *   get:
 *     summary: Get all loans
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: List of all loans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 */
router.get("/", loansController.getAllLoans);


/**
 * @swagger
 * /loans/{id}:
 *   get:
 *     summary: Get a loan by its id
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The loan id
 *     responses:
 *       200:
 *         description: The found loan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       400:
 *         description: Invalid id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Loan not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateId, loansController.getLoanById);


/**
 * @swagger
 * /loans:
 *   post:
 *     summary: Create a new loan
 *     tags: [Loans]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoanInput'
 *     responses:
 *       201:
 *         description: Loan created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: User or book not found
 */
router.post("/", auth, validate(createLoanSchema), loansController.createLoan);


/**
 * @swagger
 * /loans/{id}/return:
 *   patch:
 *     summary: Return a loan
 *     tags: [Loans]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The loan id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReturnLoanInput'
 *     responses:
 *       200:
 *         description: Loan returned
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Loan not found
 */
router.patch("/:id/return", validateId, auth, validate(returnLoanSchema), loansController.returnLoan);


/**
 * @swagger
 * /loans/{id}:
 *   delete:
 *     summary: Delete a loan
 *     tags: [Loans]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The loan id
 *     responses:
 *       204:
 *         description: Loan deleted (no content)
 *       400:
 *         description: Invalid id
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Loan not found
 */
router.delete("/:id", validateId, auth, loansController.deleteLoan);

module.exports = router;