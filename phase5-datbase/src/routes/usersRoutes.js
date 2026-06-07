const express = require('express');
const router = express.Router();

const usersController = require("../controllers/usersController");
const validateId = require("../middlewares/validateId");
const auth = require("../middlewares/auth");

router.get("/adults/list", usersController.getAdultUsers)
router.get("/", usersController.getAllUsers);
router.post("/",auth, usersController.createUser);

router.get("/:id/stats", usersController.displayUserStats);
router.get("/:id", validateId, usersController.getUserById);
router.put("/:id", validateId,auth, usersController.updateUser);
router.delete("/:id", validateId,auth, usersController.deleteUser);

module.exports = router;