import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { reviewContext } from "../../context/ReviewContext/ReviewContext";
import { URL_SHOPS } from "../../utils/URL";
import axios from "axios";

const AddReview = () => {
  const { id } = useParams();
  const { createReviewAction } = useContext(reviewContext);
  const [shop, setShop] = useState(null);
  const [formData, setFormData] = useState({
    coffeeRating: "",
    foodRating: "",
    seatingRating: "",
    chargingRating: "",
    noiseRating: "",
    comment: ""
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReviewAction({ coffeeShop: id, ...formData })
  };

  return (
    <div className="page">
      <h1>Rate & Review</h1>
      {shop ? (
        <div className="review-form">
          <h2>{shop.name}</h2>
          <form onSubmit={handleSubmit}>
          <div>
            <label className="ratings">Coffee Rating:</label>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="radio-label">
                <input
                  type="radio"
                  name="coffeeRating"
                  value={value}
                  checked={formData.coffeeRating === String(value)}
                  onChange={handleChange}
                />
                {value}
              </label>
            ))}
          </div>

          <div>
            <label className="ratings">Food Rating:</label>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="radio-label">
                <input
                  type="radio"
                  name="foodRating"
                  value={value}
                  checked={formData.foodRating === String(value)}
                  onChange={handleChange}
                />
                {value}
              </label>
            ))}
          </div>

          <div>
            <label className="ratings">Seating Rating:</label>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="radio-label">
                <input
                  type="radio"
                  name="seatingRating"
                  value={value}
                  checked={formData.seatingRating === String(value)}
                  onChange={handleChange}
                />
                {value}
              </label>
            ))}
          </div>

          <div>
            <label className="ratings">Charging Rating:</label>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="radio-label">
                <input
                  type="radio"
                  name="chargingRating"
                  value={value}
                  checked={formData.chargingRating === String(value)}
                  onChange={handleChange}
                />
                {value}
              </label>
            ))}
          </div>

          <div>
            <label className="ratings">Noise Rating:</label>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="radio-label">
                <input
                  type="radio"
                  name="noiseRating"
                  value={value}
                  checked={formData.noiseRating === String(value)}
                  onChange={handleChange}
                />
                {value}
              </label>
            ))}
          </div>

          <div className="textarea">
            <label>Comment:</label>
            <textarea name="comment" value={formData.comment} onChange={handleChange} />
          </div>

            <button className="search-button" type="submit">Submit Review</button>
          </form>
      </div>
      ) : (
        <p>Loading shop data...</p>
      )}
    </div>
  );
};

export default AddReview;
