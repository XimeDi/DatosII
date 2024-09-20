import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BookPage.css';

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [review, setReview] = useState('');
  const [summary, setSummary] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchBook();
    fetchReviews();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/books/${id}/reviews`, { summary, text: review, user_id: 1 });
      alert('Review added successfully');
      setReview('');
      setSummary('');
      const response = await axios.get(`http://localhost:5000/books/${id}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div className="book-container">
      {book ? (
        <div>
          <h1>{book.title}</h1>
          <img src={book.image} alt={book.title} width="200" />
          <p>{book.description}</p>
          <p><strong>Authors:</strong> {book.authors}</p>  {/* Autores como cadena */}
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Published Date:</strong> {book.publishedDate}</p>
          <p><strong>Categories:</strong> {book.categories}</p>  {/* Categorías como cadena */}

          <div className="reviews-container">
            <h2>Reviews</h2>
            <ul className="reviews-list">
              {reviews.map((rev, index) => (
                <li key={index}>
                  <p><strong>Summary:</strong> {rev.summary}</p>
                  <p>{rev.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="form-container">
            <h2>Add a Review</h2>
            <form onSubmit={handleReviewSubmit}>
              <div>
                <label>Summary</label>
                <input
                  type="text"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>
              <div>
                <label>Review</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
};

export default BookPage;
