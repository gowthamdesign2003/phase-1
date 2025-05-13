import React, { useEffect, useState } from 'react';
import { fetchBooks, updateShelf, deleteBook } from '../api';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks().then(res => setBooks(res.data));
  }, []);

  const handleShelfChange = (id, shelf) => {
    updateShelf(id, shelf).then(res => {
      setBooks(prev =>
        prev.map(book => (book._id === id ? { ...book, shelf: res.data.shelf } : book))
      );
    });
  };

  const handleDelete = (id) => {
    deleteBook(id).then(() => {
      setBooks(prev => prev.filter(book => book._id !== id));
    });
  };

  return (
    <div className="container">
  <h2>My Books</h2>
  {books.map(book => (
    <BookCard
      key={book._id}
      book={book}
      onShelfChange={handleShelfChange}
      onDelete={handleDelete}
    />
  ))}
</div>

  );
};

export default Home;
