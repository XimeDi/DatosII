import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import './SearchResults.css'; // Importa el CSS

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q') || '';
    setQuery(searchQuery);

    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/search?q=${searchQuery}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [location.search]);

  return (
    <div className="search-results-container">
      <h1>Search Results for "{query}"</h1>
      {results.length > 0 ? (
        <div>
          {results.map(book => (
            <div key={book.id}>
              <h2>{book.title}</h2>
              <img src={book.image} alt={book.title} width="100" />
              <p>{book.description}</p>
              <Link to={`/book/${book.id}`}>More details</Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;

