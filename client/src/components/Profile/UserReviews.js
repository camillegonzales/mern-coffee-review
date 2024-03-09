// UserReviews.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_SHOPS } from '../../utils/URL';
import { formatDate } from '../../utils/formatDate';

const UserReviews = ({ reviews }) => {
  const [coffeeShops, setCoffeeShops] = useState({});

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        // Fetch coffee shop data for all review coffee shops
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

  return (
    <div>
      <h2>Reviews:</h2>
      {reviews && reviews.length > 0 ? (
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
            {reviews.map((review, index) => (
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
                  <button>Edit</button>
                  <button>Delete</button>
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
