{/* react,
  axios = libreria para hacer solicitudes http
  useParams = acceder a parametros de la url */}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AuthorPage.css';  // Importa los estilos


{/* definicion de componentes */}
const AuthorPage = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);


  {/* cargar datos, hook se ejecuta hasta cuando cambia el id */}
  useEffect(() => {

    {/* solicita el get para obtener la informacion del autor basado en el id y actaliza el estado author */}
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/authors/${id}`);
        setAuthor(response.data);
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    };

    {/* soliccitud get para obtener los libros del autor y actualiza estado books */}
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/authors/${id}/books`);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchAuthor();
    fetchBooks();
  }, [id]);


  {/* renderiza componente */}
  return (
    <div className="author-container">

      {/* revisa si la informacion se cargo */}
      {author ? (
        <div>
          <h1>{author.name}</h1>
          <p>{author.bio}</p>
          <h2>Books by {author.name}</h2>
          <ul>
            {books.map((book) => (
              <li key={book.id}>{book.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
};

export default AuthorPage;
