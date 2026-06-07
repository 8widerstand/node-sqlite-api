const usersModel = require("../models/usersModel");
const loansModel = require("../models/loansModel");

const getAllUsers = () => {
    return usersModel.findAll();
};

const getAdultsUser = () => {
    return usersModel.findAdultUsers();
};

const getUserById = (id) => {
    const user = usersModel.findById(id);
    if (!user) {
        const error = new Error(`User with id ${id} not found`);
        error.statusCode = 404;
        throw error;
    }
    return user;
}

const displayUserStats = (id) => {
    const userData = getUserById(id);
    const userStats = loansModel.displayStats(id, userData);
    if (!userStats) {
        const error = new Error(`User with id ${id} not found`);
        error.statusCode = 404;
        throw error;
    }
    return userStats;
}

const updateUser = (id, user) => {
    const index = usersModel.findById(id);
    if (!index) {
        const error = new Error(`User with id ${id} not found`);
        error.statusCode = 404;
        throw error;
    }
    const {name, email, age} = user;

    const updatedUser = {
        name,
        email,
        age
    };

    return usersModel.updateUser(id, updatedUser);
};

const createUser = (user) => {
    const {name, email, age} = user;
    const updatedUser = {
        name,
        email,
        age
    }
    //Check if the email is UNIQUE
    const existing = usersModel.findByEmail(email);
    if (existing) {
        const error = new Error("Email already in use");
        error.statusCode = 409;
        throw error;
    }

    return usersModel.createUser(updatedUser);
};

const deleteUser = (id) => {
    const success = usersModel.deleteUser(id);
    if (!success) {
        const error = new Error(`User with id ${id} not found`);
        error.statusCode = 404;
        throw error;
    }
};

const getUserByEmail = (email) => {
    const existing = usersModel.findByEmail(email);
    if (existing) {
        const error = new Error("Email already in use");
        error.statusCode = 409;
        throw error;
    }
}

module.exports = {
    getAllUsers,
    getAdultsUser,
    getUserById,
    getUserByEmail,
    displayUserStats,
    updateUser,
    createUser,
    deleteUser,
}