import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { URL_SHOPS } from '../utils/URL';
import { useParams, useNavigate } from 'react-router-dom';
import { authContext } from "../context/AuthContext/AuthContext";
import ShopReviews from "../components/ShopProfile/ShopReviews";
import toast from 'react-hot-toast';


const ShopProfile = ({ match }) => {
  const [shop, setShop] = useState(null);
  const [shopReviews, setShopReviews] = useState(null);
  const { id } = useParams();
  const { token } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(`${URL_SHOPS}/${id}`);
        setShop(response.data.data);
        setShopReviews(response.data.data.reviews);
      } catch (error) {
        console.error('Error fetching shop:', error);
      }
    };

    fetchShop();
  }, [id]);

  const handleAddReviewClick = () => {
    if (token) {
      // User is authenticated, navigate to add review page
      navigate(`/add-review/${shop._id}`);
    } else {
      // User is not authenticated, display notification 
      toast.error("You must be logged in to add a review");
      localStorage.setItem('pendingShopId', shop._id);
      navigate('/login');
    }
  };

  const handleDeleteReview = (reviewId) => {
    const updatedReviews = shopReviews.filter(review => review._id !== reviewId);
    setShopReviews(updatedReviews);
  };

  const handleBookmarkClick = () => {
    if (token) {
      // User is authenticated
      // Need to implement bookmark logic here
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
      <ShopReviews reviews={shopReviews} onDeleteReview={handleDeleteReview} />
    </div>
  );
};

export default ShopProfile;
