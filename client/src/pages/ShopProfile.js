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

  const handleDeleteReview = async (reviewId) => {
    const updatedReviews = shopReviews.filter(review => review._id !== reviewId);
    setShopReviews(updatedReviews);

    const response = await axios.get(`${URL_SHOPS}/${id}`);
    const updatedShopData = response.data.data;

    setShop(updatedShopData);
    toast.success("Review deleted successfully")
  };

  // const handleBookmarkClick = () => {
  //   if (token) {
  //     // User is authenticated
  //     // Need to implement bookmark logic here
  //     console.log('Add/remove bookmark');
  //   } else {
  //     // User is not authenticated, display notification
  //     console.log('User not authenticated');
  //   }
  // };

  if (!shop) {
    return <div>Loading...</div>;
  }

  return (
    <div className='page'>
      <h1>{shop.name}</h1>
      {/* <button onClick={handleBookmarkClick}>Bookmark</button> */}
      <img src={shop.image} alt={shop.name} />
      <div className='shop-info'>
        <p>Neighborhood: {shop.neighborhood.name}</p>
        <p>Address: {shop.address}</p>
      </div>
      
      <div className='shop-ratings'>
        <p>Coffee Rating: {shop.coffeeRating || "N/A"}</p>
        <p>Food Rating: {shop.foodRating || "N/A"}</p>
        <p>Seating Rating: {shop.seatingRating || "N/A"}</p>
        <p>Charging Rating: {shop.chargingRating || "N/A"}</p>
        <p>Noise Rating: {shop.noiseRating || "N/A"}</p>
      </div>
      

      <h2>Reviews:</h2>
      <button className='search-button' onClick={handleAddReviewClick}>Add Review</button>
      <ShopReviews reviews={shopReviews} onDeleteReview={handleDeleteReview} shopID={shop.id} />
    </div>
  );
};

export default ShopProfile;
