import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { URL_SHOPS } from '../utils/URL';
import { useParams, useNavigate } from 'react-router-dom';
import { authContext } from "../context/AuthContext/AuthContext";
import toast from 'react-hot-toast';

const ShopProfile = ({ match }) => {
  const [shop, setShop] = useState(null);
  const { id } = useParams();
  const { token } = useContext(authContext);
  const navigate = useNavigate();

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

  const handleAddReviewClick = () => {
    if (token) {
      // User is authenticated, navigate to add review page
      navigate('/add-review', { state: { shop: shop } });
    } else {
      // User is not authenticated, display notification 
      toast.error("You must be logged in to add a review");
      navigate('/login', { state: { from: 'add-review', shop: shop } });
    }
  };

  const handleBookmarkClick = () => {
    if (token) {
      // User is authenticated
      // You need to implement bookmark logic here
      console.log('Add/remove bookmark');
    } else {
      // User is not authenticated, display notification
      console.log('User not authenticated');
    }
  };

  if (!shop) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{shop.name}</h1>
      <button onClick={handleBookmarkClick}>Bookmark</button>
      <img src={shop.image} alt={shop.name} />
      <p>Neighborhood: {shop.neighborhood.name}</p>
      <p>Address: {shop.address}</p>
      <p>Coffee Rating: {shop.coffeeRating}</p>
      <p>Food Rating: {shop.foodRating}</p>
      <p>Seating Rating: {shop.seatingRating}</p>
      <p>Charging Rating: {shop.chargingRating}</p>
      <p>Noise Rating: {shop.noiseRating}</p>

      <h2>Reviews</h2>
      <button onClick={handleAddReviewClick}>Add Review</button>
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
