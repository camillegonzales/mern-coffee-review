import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_SHOPS } from '../utils/URL';
import { useParams } from 'react-router-dom';

const ShopProfile = ({ match }) => {
  const [shop, setShop] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(`${URL_SHOPS}/${id}`);
        setShop(response.data.data);
      } catch (error) {
        console.error('Error fetching shop:', error);
      }
    };

    fetchShop();
  }, [id]);

  if (!shop) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{shop.name}</h1>
      <button>Bookmark</button>
      <img src={shop.image} alt={shop.name} />
      <p>Neighborhood: {shop.neighborhood.name}</p>
      <p>Address: {shop.address}</p>
      <p>Coffee Rating: {shop.coffeeRating}</p>
      <p>Food Rating: {shop.foodRating}</p>
      <p>Seating Rating: {shop.seatingRating}</p>
      <p>Charging Rating: {shop.chargingRating}</p>
      <p>Noise Rating: {shop.noiseRating}</p>
      
      <h2>Reviews</h2>
      <button>Add Review</button>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Rating</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {shop.reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.user}</td>
              <td>{review.rating}</td>
              <td>{review.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopProfile;
