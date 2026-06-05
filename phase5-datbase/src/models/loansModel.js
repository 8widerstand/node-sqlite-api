// ==========================================
// loansModel.js
//  Access to loan data, INCLUDING JOINs
// ==========================================

const db = require("../database/database");

// --- prepared Statement ---

// All loans with enhanced details (username + book title)
const findAllStmt = db.prepare(`
    SELECT loans.id,
           loans.borrow_date,
           loans.return_date,
           users.id    AS user_id,
           users.name  AS user_name,
           books.id    AS book_id,
           books.title AS book_title
    FROM loans
             INNER JOIN users ON loans.user_id = users.id
             INNER JOIN books ON loans.book_id = books.id
`);

// A loan by id (also enriched)
const findByIdStmt = db.prepare(`
    SELECT loans.id,
           loans.borrow_date,
           loans.return_date,
           users.id    AS user_id,
           users.name  AS user_name,
           books.id    AS book_id,
           books.title AS book_title
    FROM loans
             INNER JOIN users ON loans.user_id = users.id
             INNER JOIN books ON loans.book_id = books.id
    WHERE loans.id = ?
`);

// All loans by a specific users
const findByUserStmt = db.prepare(`
    SELECT loans.id,
           loans.borrow_date,
           loans.return_date,
           books.id    AS book_id,
           books.title AS book_title
    FROM loans
             INNER JOIN books ON loans.book_id = books.id
    WHERE loans.user_id = ?
`);

// All current loans (where return_date IS NULL = not yet returned)
const findActiveStmt = db.prepare(`
    SELECT loans.id,
           loans.borrow_date,
           users.name  AS user_name,
           books.title AS book_title
    FROM loans
             INNER JOIN users ON loans.user_id = users.id
             INNER JOIN books ON loans.book_id = books.id
    WHERE loans.return_date IS NULL
`);

//Get a for a random user its name, email, total of loans, current loans, returned loans
const countUserTotalLoansStmt = db.prepare(`
    SELECT COUNT(*) AS count
    FROM loans
    WHERE user_id = ?
`);

const countUserReturnedLoansStmt = db.prepare(`
    SELECT COUNT(*) AS count
    FROM loans
    WHERE user_id = ?
      AND return_date IS NOT NULL
`);

const countUserCurrentLoansStmt = db.prepare(`
    SELECT COUNT(*) AS count
    FROM loans
    WHERE user_id = ?
      AND return_date IS NULL
`);


// Setting up a loan
const insertStmt = db.prepare(`
    INSERT INTO loans (user_id, book_id, borrow_date, return_date)
    VALUES (?, ?, ?, ?)
`);

// Mark a loan as returned (enter the return date)
const returnStmt = db.prepare(`
    UPDATE loans
    SET return_date = ?
    WHERE id = ?
`);

// Delete a loan
const deleteStmt = db.prepare(`DELETE
                               FROM loans
                               WHERE id = ?`);


// ---  Helper for formatting loans as nested objects ---
const formatLoan = (row) => {
    if (!row) return null;
    return {
        id: row.id,
        borrow_date: row.borrow_date,
        return_date: row.return_date,
        user: {
            id: row.user_id,
            name: row.user_name,
        },
        book: {
            id: row.book_id,
            title: row.book_title,
        },
    };
};


const findAll = () => {
    return findAllStmt.all().map(formatLoan);
};

const findById = (id) => {
    return formatLoan(findByIdStmt.get(id));
};

const findByUser = (userId) => {
    return findByUserStmt.all(userId);
};

const findActive = () => {
    return findActiveStmt.all();
};

const displayStats = (userId, userData) => {
    const totalLoans = countUserTotalLoansStmt.get(userId).count;
    const activeLoans = countUserCurrentLoansStmt.get(userId).count;
    const finishedLoans = countUserReturnedLoansStmt.get(userId).count;
    return {
        user:{
            id: userId,
            name: userData.name,
            email: userData.email,
        },
        total_loans: totalLoans,
        active_loans: activeLoans,
        finished_loans: finishedLoans,
    }
};

const create = (loanData) => {
    const {user_id, book_id, borrow_date, return_date} = loanData;
    const result = insertStmt.run(
        user_id,
        book_id,
        borrow_date,
        return_date ?? null
    );
    return findById(result.lastInsertRowid);
};

const markReturned = (id, returnDate) => {
    const result = returnStmt.run(returnDate, id);
    if (result.changes === 0) return null;
    return findById(id);
};

const remove = (id) => {
    const result = deleteStmt.run(id);
    return result.changes > 0;
};

module.exports = {
    findAll,
    findById,
    findByUser,
    findActive,
    displayStats,
    create,
    markReturned,
    remove,
};