const db = require('../database/database');

const findAllStmt = db.prepare("SELECT * FROM users");
const findByIdStmt = db.prepare("SELECT * FROM users WHERE id = ?");
const findByEmailStmt = db.prepare("SELECT * FROM users WHERE email = ?");
const findAdultStmt = db.prepare("SELECT * FROM users WHERE age >= 18");
const insertStmt = db.prepare(`
    INSERT INTO users (name, email, age)
    VALUES (?, ?, ?)
`);
const updateStmt = db.prepare(`
    UPDATE users
    SET name  = ?,
        email = ?,
        age   = ?
    WHERE id = ?
`);

const deleteStmt = db.prepare(`DELETE
                               FROM users
                               WHERE id = ?`)

// get all users
const findAll = () => {
    return findAllStmt.all();
};

// get a user by id
const findById = (userId) => {
    const result = findByIdStmt.get(userId);
    if (!result) return null;
    return result;
};

//get a user by email
const findByEmail = (email) => {
    const result = findByEmailStmt.get(email);
    if (!result) return null;
    return result;
}

//get adult users
const findAdultUsers = () => {
    return findAdultStmt.all();
}

// create a user
const createUser = (userData) => {
    const {name, email, age} = userData;
    const newUser = insertStmt.run(name, email, age);
    return findById(newUser.lastInsertRowid);
};

//update a user
const updateUser = (id, userData) => {
    const {name, email, age} = userData;
    const updatedUser = updateStmt.run(name, email, age, id);
    if (updatedUser.changes === 0) return null;
    return findById(id);
};

//delete a user
const deleteUser = (userId) => {
    const result = deleteStmt.run(userId);
    return result.changes > 0;
};

module.exports = {
    findAll,
    findById,
    findAdultUsers,
    createUser,
    findByEmail,
    updateUser,
    deleteUser,
}