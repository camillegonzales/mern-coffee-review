// ShopReviews.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { URL_USER } from '../../utils/URL';
import { formatDate } from '../../utils/formatDate';
import { authContext } from '../../context/AuthContext/AuthContext';
import { reviewContext } from '../../context/ReviewContext/ReviewContext';
import { useNavigate } from 'react-router-dom';

const ShopReviews = ({ reviews, onDeleteReview, shopID }) => {
  const [users, setUsers] = useState({});
  const { userAuth } = useContext(authContext);
  const { deleteReviewAction } = useContext(reviewContext); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await axios.get(`${URL_USER}`);
          const usersData = response.data.data;
          const usersMap = {};
          if (Array.isArray(usersData)) {
            usersData.forEach((user) => {
              usersMap[user.id] = user.userName;
            });
          } else {
            console.log('No user data available');
          }
  
          setUsers(usersMap);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

    fetchUsers();
  }, []);

  const handleEditReviewClick = (reviewId) => {
    localStorage.setItem('goBack', `/shop/${shopID}`);
    navigate(`/edit-review/${reviewId}`);
  };

  const handleDeleteReviewClick = async (reviewId) => {
    try {
        await deleteReviewAction(reviewId);
        onDeleteReview(reviewId); // Call the parent function to update reviews state
    } catch (error) {
        console.error('Error deleting review:', error);
    }
  };

  return (
    <div>
      {reviews && reviews.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Created At</th>
              <th>Created By</th>
              <th>Coffee</th>
              <th>Food</th>
              <th>Seating</th>
              <th>Charging</th>
              <th>Noise</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index}>
                <td>{formatDate(review.createdAt)}</td>
                <td>{users[review.user]}</td>
                <td>{review.coffeeRating}</td>
                <td>{review.foodRating}</td>
                <td>{review.seatingRating}</td>
                <td>{review.chargingRating}</td>
                <td>{review.noiseRating}</td>
                <td>{review.comment}</td>
                <td>
                    { userAuth && JSON.parse(localStorage.getItem('userAuth'))?.userFound?._id  === review.user && (
                        <>
                            <button onClick={() => handleEditReviewClick(review._id)}><i class="fa-solid fa-pen-to-square"></i></button>
                            <button onClick={() => handleDeleteReviewClick(review._id)}><i class="fa-solid fa-trash-can"></i></button>
                        </>
                    )}
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

export default ShopReviews;
