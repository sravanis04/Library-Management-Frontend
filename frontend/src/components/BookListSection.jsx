// src/components/BookListSection.jsx
import React from 'react';
import BookCard from './BookCard';
import { useBooks } from '../hooks/useBooks';

const BookListSection = () => {
  const { books, loading, error, searchTerm, setSearchTerm, refreshBooks } = useBooks();

  const sectionStyle = {
    margin: '20px auto',
    padding: '20px',
    maxWidth: '800px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  const searchInputStyle = {
    width: 'calc(100% - 22px)', // Account for padding
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1em',
  };

  return (
    <div style={sectionStyle}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '25px' }}>All Books</h2>
      <input
        type="text"
        placeholder="Search books by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={searchInputStyle}
      />

      {loading && <p style={{ textAlign: 'center', color: '#007bff' }}>Loading books...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>{error}</p>}

      {!loading && books.length === 0 && !error && (
        <p style={{ textAlign: 'center', color: '#555' }}>No books found. Try adding some!</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={refreshBooks}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em',
          }}
        >
          Refresh Books
        </button>
      </div>
    </div>
  );
};

export default BookListSection;