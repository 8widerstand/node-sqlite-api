// ==========================================
// usersRoutes.js
// Purpose: to map URLs to controllers.
// We use an Express “Router”: a mini-app that we will attach elsewhere.
// ==========================================

const express = require('express');
const router = express.Router();

const usersController = require("../controllers/usersController");
const validateId = require("../middlewares/validateId");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const {createUserSchema, updateUserSchema} = require("../schemas/userShemas")


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Alice Dupont"
 *         email:
 *           type: string
 *           example: "alice@example.com"
 *         age:
 *           type: integer
 *           example: 25
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: "Bob Martin"
 *         email:
 *           type: string
 *           example: "bob@example.com"
 *         age:
 *           type: integer
 *           example: 18
 *     UserStats:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/User'
 *         totalLoans:
 *           type: integer
 *           example: 3
 *         activeLoans:
 *           type: integer
 *           example: 1
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Resource not found"
 */


/**
 * @swagger
 * /users/adults/list:
 *   get:
 *     summary: Get only adult users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of adult users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/adults/list", usersController.getAdultUsers)


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", usersController.getAllUsers);


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authenticated
 */
router.post("/",auth,validate(createUserSchema), usersController.createUser);


/**
 * @swagger
 * /users/{id}/stats:
 *   get:
 *     summary: Get statistics for a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserStats'
 *       404:
 *         description: User not found
 */
router.get("/:id/stats", usersController.displayUserStats);


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by its id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user id
 *     responses:
 *       200:
 *         description: The found user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateId, usersController.getUserById);


/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: User not found
 */
router.put("/:id", validateId,auth,validate(updateUserSchema), usersController.updateUser);


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user id
 *     responses:
 *       204:
 *         description: User deleted (no content)
 *       400:
 *         description: Invalid id
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: User not found
 */
router.delete("/:id", validateId,auth, usersController.deleteUser);

module.exports = router;