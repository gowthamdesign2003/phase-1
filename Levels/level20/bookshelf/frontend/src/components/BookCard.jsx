import React from 'react';

const BookCard = ({ book, onShelfChange, onDelete }) => (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>by {book.authors?.join(', ')}</p>
      <p>{book.description?.slice(0, 100)}...</p>
      <select value={book.shelf} onChange={e => onShelfChange(book._id, e.target.value)}>
        <option value="read">Read</option>
        <option value="reading">Reading</option>
        <option value="wantToRead">Want to Read</option>
      </select>
      <button onClick={() => onDelete(book._id)}>Delete</button>
    </div>
  );
  

export default BookCard;
