// src/hooks/useBooks.js
import { useState, useEffect, useCallback } from 'react';
import { getBooks } from '../API';

export const useBooks = (initialSearchTerm = '') => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks(searchTerm);
      setBooks(data);
    } catch (err) {
      setError('Failed to fetch books. Please ensure the backend is running and accessible.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return { books, loading, error, searchTerm, setSearchTerm, refreshBooks: fetchBooks };
};