// src/components/AddBookForm.jsx
import React, { useState } from 'react';
import { addBook } from '../API';

const AddBookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [availableCopies, setAvailableCopies] = useState('');
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!title || !author || !isbn || availableCopies === '') {
      setMessage({ type: 'error', text: 'All fields are required.' });
      setLoading(false);
      return;
    }
    if (isNaN(parseInt(availableCopies, 10)) || parseInt(availableCopies, 10) < 0) {
        setMessage({ type: 'error', text: 'Available Copies must be a non-negative number.' });
        setLoading(false);
        return;
    }


    const bookData = { title, author, isbn, availableCopies: parseInt(availableCopies, 10) };

    try {
      await addBook(bookData);
      setMessage({ type: 'success', text: `Book "${title}" added successfully!` });
      setTitle('');
      setAuthor('');
      setIsbn('');
      setAvailableCopies('');
      if (onBookAdded) {
        onBookAdded();
      }
    } catch (err) {
      setMessage({ type: 'error', text: `Failed to add book: ${err.message}` });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    opacity: loading ? 0.7 : 1,
    transition: 'background-color 0.3s ease',
  };

  const messageStyle = {
    padding: '10px',
    borderRadius: '4px',
    marginTop: '15px',
    textAlign: 'center',
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '30px', border: '1px solid #eee', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '25px' }}>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>ISBN:</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Available Copies:</label>
          <input
            type="number"
            value={availableCopies}
            onChange={(e) => setAvailableCopies(e.target.value)}
            required
            min="0"
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
      {message && (
        <div style={{ ...messageStyle, backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da', color: message.type === 'success' ? '#155724' : '#721c24' }}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AddBookForm;