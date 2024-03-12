// UserReviews.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { URL_SHOPS } from '../../utils/URL';
import { formatDate } from '../../utils/formatDate';
import { reviewContext } from '../../context/ReviewContext/ReviewContext';
import { useNavigate } from 'react-router-dom';

const UserReviews = ({ reviews, onDeleteReview }) => {
  const [coffeeShops, setCoffeeShops] = useState({});
  const [localReviews, setLocalReviews] = useState(reviews);
  const { deleteReviewAction } = useContext(reviewContext); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        const response = await axios.get(`${URL_SHOPS}`);
        const coffeeShopsData = response.data.data;
        const coffeeShopsMap = {};
        if (Array.isArray(coffeeShopsData)) {
          coffeeShopsData.forEach((coffeeShop) => {
            coffeeShopsMap[coffeeShop.id] = coffeeShop.name;
          });
        } else {
          console.log('No coffee shop data available');
        }

        setCoffeeShops(coffeeShopsMap);
      } catch (error) {
        console.error('Error fetching coffee shop data:', error);
      }
    };

    fetchCoffeeShops();
  }, []);

  // Update local reviews state when reviews prop changes
  useEffect(() => {
    setLocalReviews(reviews);
  }, [reviews]);

  const handleEditReviewClick = (reviewId) => {
    localStorage.setItem('goBack', '/profile');
    navigate(`/edit-review/${reviewId}`);
  };

  const handleDeleteReviewClick = async (reviewId) => {
    try {
      await deleteReviewAction(reviewId);
      onDeleteReview(reviewId);

      // Update local reviews state after deletion
      setLocalReviews(localReviews.filter(review => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div>
      <h2>Reviews:</h2>
      {localReviews && localReviews.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Created At</th>
              <th>Coffee Shop</th>
              <th>Coffee Rating</th>
              <th>Food Rating</th>
              <th>Seating Rating</th>
              <th>Charging Rating</th>
              <th>Noise Rating</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {localReviews.map((review, index) => (
              <tr key={index}>
                <td>{formatDate(review.createdAt)}</td>
                <td>{coffeeShops[review.coffeeShop]}</td>
                <td>{review.coffeeRating}</td>
                <td>{review.foodRating}</td>
                <td>{review.seatingRating}</td>
                <td>{review.chargingRating}</td>
                <td>{review.noiseRating}</td>
                <td>{review.comment}</td>
                <td>
                  <button onClick={() => handleEditReviewClick(review._id)}>Edit</button>
                  <button onClick={() => handleDeleteReviewClick(review._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reviews</p>
      )}
    </div>
  );
};

export default UserReviews;
