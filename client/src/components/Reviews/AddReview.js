import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import { URL_REVIEWS } from "../../utils/URL";
import toast from "react-hot-toast";

const AddReview = () => {
  const location = useLocation();
  const shop = location.state?.shop;
  const navigate = useNavigate();

  const [coffeeRating, setCoffeeRating] = useState('');
  const [foodRating, setFoodRating] = useState('');
  const [seatingRating, setSeatingRating] = useState('');
  const [chargingRating, setChargingRating] = useState('');
  const [noiseRating, setNoiseRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL_REVIEWS, {
        coffeeShop: shop._id,
        coffeeRating,
        foodRating,
        seatingRating,
        chargingRating,
        noiseRating,
        comment
      });

      if (res?.data?.status === 'success') {
        console.log('Review added:', res.data);
      // Redirect back to the shop profile page after successful review submission
      navigate(`/shop/${shop._id}`)
      } else {
        toast.error(res.error)
      }
      
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div>
      <h1>Rate & Review</h1>
      <p>Coffee shop: {shop.name}</p>
      <form onSubmit={handleSubmit}>

      <div>
        <label htmlFor="coffeeRating">Coffee Rating:</label>
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="coffeeRating"
              value={value}
              checked={coffeeRating === value}
              onChange={(e) => setCoffeeRating(Number(e.target.value))}
            />
            {value}
          </label>
        ))}
      </div>

      <div>
        <label htmlFor="foodRating">Food Rating:</label>
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="foodRating"
              value={value}
              checked={foodRating === value}
              onChange={(e) => setFoodRating(Number(e.target.value))}
            />
            {value}
          </label>
        ))}
      </div>

      <div>
        <label htmlFor="seatingRating">Seating Rating:</label>
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="seatingRating"
              value={value}
              checked={seatingRating === value}
              onChange={(e) => setSeatingRating(Number(e.target.value))}
            />
            {value}
          </label>
        ))}
      </div>

      <div>
        <label htmlFor="chargingRating">Charging Rating:</label>
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="chargingRating"
              value={value}
              checked={chargingRating === value}
              onChange={(e) => setChargingRating(Number(e.target.value))}
            />
            {value}
          </label>
        ))}
      </div>

      <div>
        <label htmlFor="noiseRating">Noise Rating:</label>
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="noiseRating"
              value={value}
              checked={noiseRating === value}
              onChange={(e) => setNoiseRating(Number(e.target.value))}
            />
            {value}
          </label>
        ))}
      </div>
        <div>
          <label>Comment:</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
