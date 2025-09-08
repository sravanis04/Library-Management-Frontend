// src/components/StudentOperationsSection.jsx
import React, { useState, useEffect } from 'react';
import { getStudents, getBooks, issueBook, returnBook, getStudentIssuedBooks } from '../API';

const StudentOperationsSection = ({ refreshBooks }) => {
  const [students, setStudents] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedBookToIssue, setSelectedBookToIssue] = useState('');
  const [selectedBookToReturn, setSelectedBookToReturn] = useState('');
  const [issuedBooksByStudent, setIssuedBooksByStudent] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      fetchStudentIssuedBooks(selectedStudent);
    } else {
      setIssuedBooksByStudent([]);
    }
  }, [selectedStudent]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedStudents = await getStudents();
      setStudents(fetchedStudents);
      const fetchedBooks = await getBooks();
      setAllBooks(fetchedBooks);
    } catch (err) {
      setMessage({ type: 'error', text: `Failed to load data: ${err.message}` });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentIssuedBooks = async (studentId) => {
    try {
      const issued = await getStudentIssuedBooks(studentId);
      setIssuedBooksByStudent(issued);
    } catch (err) {
      setMessage({ type: 'error', text: `Failed to load issued books for student: ${err.message}` });
      console.error(err);
    }
  };

  const handleIssueBook = async () => {
    setMessage(null);
    if (!selectedStudent || !selectedBookToIssue) {
      setMessage({ type: 'error', text: 'Please select both a student and a book to issue.' });
      return;
    }
    setLoading(true);
    try {
      await issueBook(selectedStudent, selectedBookToIssue);
      setMessage({ type: 'success', text: 'Book issued successfully!' });
      setSelectedBookToIssue('');
      fetchData();
      if (selectedStudent) fetchStudentIssuedBooks(selectedStudent);
      if (refreshBooks) refreshBooks();
    } catch (err) {
      setMessage({ type: 'error', text: `Failed to issue book: ${err.message}` });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBook = async () => {
    setMessage(null);
    if (!selectedStudent || !selectedBookToReturn) {
      setMessage({ type: 'error', text: 'Please select both a student and a book to return.' });
      return;
    }
    setLoading(true);
    try {
      await returnBook(selectedStudent, selectedBookToReturn);
      setMessage({ type: 'success', text: 'Book returned successfully!' });
      setSelectedBookToReturn('');
      fetchData();
      if (selectedStudent) fetchStudentIssuedBooks(selectedStudent);
      if (refreshBooks) refreshBooks();
    } catch (err) {
      setMessage({ type: 'error', text: `Failed to return book: ${err.message}` });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sectionStyle = {
    margin: '20px auto',
    padding: '30px',
    maxWidth: '800px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  const selectStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    padding: '10px 20px',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    opacity: loading ? 0.7 : 1,
    marginRight: '10px',
    transition: 'background-color 0.3s ease',
  };

  const messageStyle = {
    padding: '10px',
    borderRadius: '4px',
    marginTop: '15px',
    textAlign: 'center',
  };

  const availableBooksForIssue = allBooks.filter(book => book.availableCopies > 0);

  return (
    <div style={sectionStyle}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '25px' }}>Student Operations</h2>

      {loading && <p style={{ textAlign: 'center', color: '#007bff' }}>Loading data...</p>}
      {message && (
        <div style={{ ...messageStyle, backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da', color: message.type === 'success' ? '#155724' : '#721c24' }}>
          {message.text}
        </div>
      )}

      {/* Student Selection */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Select Student:</label>
        <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} style={selectStyle}>
          <option value="">-- Select a Student --</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name} ({student.rollNumber})
            </option>
          ))}
        </select>
      </div>

      {/* Issue Book Section */}
      {selectedStudent && (
        <>
          <h3 style={{ color: '#333', marginTop: '30px', marginBottom: '15px' }}>Issue Book</h3>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Book to Issue:</label>
            <select value={selectedBookToIssue} onChange={(e) => setSelectedBookToIssue(e.target.value)} style={selectStyle}>
              <option value="">-- Select a Book --</option>
              {availableBooksForIssue.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title} by {book.author} (Available: {book.availableCopies})
                </option>
              ))}
            </select>
            <button
              onClick={handleIssueBook}
              style={{ ...buttonStyle, backgroundColor: '#007bff' }}
              disabled={loading || !selectedBookToIssue}
            >
              Issue Book
            </button>
          </div>

          {/* Return Book Section */}
          <h3 style={{ color: '#333', marginTop: '30px', marginBottom: '15px' }}>Return Book</h3>
          <div style={{ marginBottom: '20px' }}>
            {issuedBooksByStudent.length === 0 ? (
              <p style={{ color: '#777' }}>No books issued by this student.</p>
            ) : (
              <>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Select Issued Book:</label>
                <select value={selectedBookToReturn} onChange={(e) => setSelectedBookToReturn(e.target.value)} style={selectStyle}>
                  <option value="">-- Select a Book to Return --</option>
                  {issuedBooksByStudent.map((book) => (
                    <option key={book._id} value={book._id}>
                      {book.title} by {book.author}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleReturnBook}
                  style={{ ...buttonStyle, backgroundColor: '#28a745' }}
                  disabled={loading || !selectedBookToReturn}
                >
                  Return Book
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentOperationsSection;
