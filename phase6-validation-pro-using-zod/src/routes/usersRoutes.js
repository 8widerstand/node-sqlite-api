const express = require('express');
const router = express.Router();

const usersController = require("../controllers/usersController");
const validateId = require("../middlewares/validateId");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const {createUserSchema, updateUserSchema} = require("../schemas/userShemas")

router.get("/adults/list", usersController.getAdultUsers)
router.get("/", usersController.getAllUsers);
router.post("/",auth,validate(createUserSchema), usersController.createUser);

router.get("/:id/stats", usersController.displayUserStats);
router.get("/:id", validateId, usersController.getUserById);
router.put("/:id", validateId,auth,validate(updateUserSchema), usersController.updateUser);
router.delete("/:id", validateId,auth, usersController.deleteUser);

module.exports = router;