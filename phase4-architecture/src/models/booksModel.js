// ==========================================
// booksModel.js
// Responsibility: Manage book STORAGE.
// ==========================================

let books = [
    { id: 1, title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", year: 1943, available: true },
    { id: 2, title: "1984", author: "George Orwell", year: 1949, available: false },
    { id: 3, title: "Orgueil et Préjugés", author: "Jane Austen", year: 1813, available: true },
    { id: 4, title: "L'Étranger", author: "Albert Camus", year: 1942, available: false },
];

let nextId = 5;

//return all books
const findAll = () => {
    return books;
};

// return one book by id
const findById = (id) => {
    return books.find(book => book.id === id);
};

//return available books
const findAvailable = () => {
    return books.find(book => book.available === true);
};

//create a new book and return them
const createBook = (bookData) => {
    const newBook = {
        id: nextId,
        ...bookData,
    };
    books.push(newBook);
    nextId++;
    return newBook;
};

// replace a book and return the modified book
const updateBook = (bookData) => {
    const index = books.findIndex(book => book.id === bookData.id);
    if (index === -1) return null;

    books[index] = {
        id: index,
        ...bookData,
    };

    return books[index];
}

//delete a book and return true if deleted
const deleteBook = (id) => {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return false;

    books.splice(index, 1);
    return true;
}

module.exports = {
    findAll,
    findById,
    findAvailable,
    createBook,
    updateBook,
    deleteBook,
}