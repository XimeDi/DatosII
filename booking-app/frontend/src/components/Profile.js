import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './Profile.css'; // Importa el CSS

const Profile = () => {
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const booksResponse = await axios.get(`http://localhost:5000/users/${user.id}/books`);
          setBooks(booksResponse.data);
          const reviewsResponse = await axios.get(`http://localhost:5000/users/${user.id}/reviews`);
          setReviews(reviewsResponse.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="profile-container">
      {user ? (
        <div>
          <h1>{user.username}'s Profile</h1>

          <h2>My Books</h2>
          <ul>
            {books.map((book) => (
              <li key={book.id}>{book.title}</li>
            ))}
          </ul>

          <h2>My Reviews</h2>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <p><strong>Book ID:</strong> {review.book_id}</p>
                <p><strong>Summary:</strong> {review.summary}</p>
                <p>{review.text}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
