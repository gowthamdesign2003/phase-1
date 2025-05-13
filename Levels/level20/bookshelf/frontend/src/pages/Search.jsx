import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchBooks = async () => {
    if (!query) return;
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
      );
      setResults(response.data.items || []);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  const saveBook = async (item) => {
    const bookData = {
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      description: item.volumeInfo.description || '',
      shelf: 'wantToRead',
    };

    try {
      await axios.post('http://localhost:5000/api/books', bookData);
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Failed to save book.');
    }
  };

  return (
    <div className="container">
      <h2>Search Books</h2>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search books..."
      />
      <button className="search-btn" onClick={searchBooks}>Search</button>

      {results.map(item => (
        <div className="book-card" key={item.id}>
          <h3>{item.volumeInfo.title}</h3>
          <p>{item.volumeInfo.authors?.join(', ')}</p>
          <p>{item.volumeInfo.description?.slice(0, 100)}...</p>
          <button onClick={() => saveBook(item)}>Add</button>
        </div>
      ))}
    </div>
  );
};

export default Search;
