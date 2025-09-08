// src/components/BookCard.jsx
import React from 'react';

const BookCard = ({ book }) => {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    backgroundColor: '#fff',
  };

  const titleStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
  };

  const detailStyle = {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: '3px',
  };

  const availabilityStyle = {
    fontSize: '1em',
    fontWeight: 'bold',
    color: book.availableCopies > 0 ? '#28a745' : '#dc3545',
    marginTop: '10px',
  };

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{book.title}</div>
      <div style={detailStyle}>by {book.author}</div>
      <div style={detailStyle}>ISBN: {book.isbn}</div>
      <div style={availabilityStyle}>
        Available: {book.availableCopies} {book.availableCopies === 0 ? '(Out of Stock)' : ''}
      </div>
    </div>
  );
};

export default BookCard;