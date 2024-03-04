import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext, useState } from 'react';
import { URL_REVIEWS } from "../../utils/URL";
import toast from "react-hot-toast";
import { authContext } from "../../context/AuthContext/AuthContext";

const AddReview = () => {
  const shop = ;
  const navigate = useNavigate();
  const { userAuth } = useContext(authContext);

  const [coffeeRating, setCoffeeRating] = useState('');
  const [foodRating, setFoodRating] = useState('');
  const [seatingRating, setSeatingRating] = useState('');
  const [chargingRating, setChargingRating] = useState('');
  const [noiseRating, setNoiseRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('handling submit')
      const res = await axios.post(`${URL_REVIEWS}`, {
        user: userAuth?.userFound?._id,
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
        <label>Coffee Rating:</label>
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
        <label>Food Rating:</label>
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
        <label>Seating Rating:</label>
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
        <label>Charging Rating:</label>
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
        <label>Noise Rating:</label>
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
