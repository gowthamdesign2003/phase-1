import React from 'react';
import Home from './pages/Home';
import Search from './pages/Search';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles.css';
const App = () => (
  <Router>
    <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
      <Link to="/search">Search</Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  </Router>
);

export default App;
