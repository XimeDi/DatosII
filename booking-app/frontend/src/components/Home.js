import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';  // Importa el CSS

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = () => {
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <div className="home-container">
      <h1>Home</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for books, authors, or genres"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="books-container">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <h2>{book.title}</h2>
            <img src={book.image} alt={book.title} width="100" />
            <p>{book.description}</p>
            <Link to={`/book/${book.id}`}>More details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
