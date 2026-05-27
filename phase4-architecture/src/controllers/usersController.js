const userService = require("../Services/usersService");

const getAllUsers = (req, res) => {
    try {
        const users = userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
};

const getAdultUsers = (req, res) => {
    try {
        const adultUsers = userService.getAdultsUser();
        res.json(adultUsers);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
};

const getUserById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = userService.getUserById(id);
        res.json(user);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
};

const updateUser = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const userData = req.body;
        const updatedUser = userService.updateUser(id, userData);
        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

const createUser = (req, res) => {
    try {
        const userData = req.body;
        const newUser = userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

const deleteUser = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        userService.deleteUser(id);
        res.status(204).send();
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

module.exports = {
    getAllUsers,
    getAdultUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser,
}
