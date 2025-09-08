// src/API.js

// Simulate backend storage
let books = [
  { _id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '12345', availableCopies: 3 },
  { _id: '2', title: '1984', author: 'George Orwell', isbn: '67890', availableCopies: 5 },
];

let students = [
  { _id: '1', name: 'Alice', rollNumber: '101', issuedBooks: [] },
  { _id: '2', name: 'Bob', rollNumber: '102', issuedBooks: [] },
];

// BOOK APIs
export const getBooks = async (search = '') => {
  return books.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));
};

export const addBook = async (book) => {
  const newBook = { ...book, _id: Date.now().toString() };
  books.push(newBook);
  return newBook;
};

// STUDENT APIs
export const getStudents = async () => students;

export const issueBook = async (studentId, bookId) => {
  const student = students.find((s) => s._id === studentId);
  const book = books.find((b) => b._id === bookId);

  if (!student || !book || book.availableCopies <= 0) {
    throw new Error('Cannot issue book');
  }

  student.issuedBooks.push(bookId);
  book.availableCopies -= 1;
  return true;
};

export const returnBook = async (studentId, bookId) => {
  const student = students.find((s) => s._id === studentId);
  const book = books.find((b) => b._id === bookId);

  if (!student || !book) throw new Error('Invalid student/book');

  student.issuedBooks = student.issuedBooks.filter((id) => id !== bookId);
  book.availableCopies += 1;
  return true;
};

export const getStudentIssuedBooks = async (studentId) => {
  const student = students.find((s) => s._id === studentId);
  if (!student) return [];
  return books.filter((b) => student.issuedBooks.includes(b._id));
};
