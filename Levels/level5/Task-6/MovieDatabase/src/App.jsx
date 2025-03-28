import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "YOUR_OMDB_API_KEY"; 
const API_URL = "https://www.omdbapi.com/";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (query) => {
    if (!query) return;
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get(`${API_URL}?s=${query}&apikey=${API_KEY}`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
    }
    
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="movie-app">
      <h1>🎬 Movie Search</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>({movie.Year})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
