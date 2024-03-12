import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { reviewContext } from "../../context/ReviewContext/ReviewContext";
import { URL_REVIEWS, URL_SHOPS } from "../../utils/URL";
import axios from "axios";

const EditReview = () => {
  const { id } = useParams();
  const { updateReviewAction } = useContext(reviewContext);
  const [coffeeShop, setCoffeeShop] = useState(null);
  const [review, setReview] = useState(null);
  const [formData, setFormData] = useState({
    coffeeRating: "",
    foodRating: "",
    seatingRating: "",
    chargingRating: "",
    noiseRating: "",
    comment: ""
  });

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`${URL_REVIEWS}/${id}`);
        const reviewData = response.data.data;
        setReview(reviewData);
        setFormData({
          coffeeRating: reviewData.coffeeRating.toString(),
          foodRating: reviewData.foodRating.toString(),
          seatingRating: reviewData.seatingRating.toString(),
          chargingRating: reviewData.chargingRating.toString(),
          noiseRating: reviewData.noiseRating.toString(),
          comment: reviewData.comment
        });

        const coffeeShopResponse = await axios.get(`${URL_SHOPS}/${reviewData.coffeeShop}`);
        console.log(coffeeShopResponse.data.data)
        setCoffeeShop(coffeeShopResponse.data.data);
        console.log(coffeeShop)
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };

    fetchReview();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReviewAction(id, formData); 
  };

  return (
    <div>
      <h1>Edit Review</h1>
      {review && coffeeShop ? (
        <>
          <p>Coffee shop: {coffeeShop.name}</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Coffee Rating:</label>
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="coffeeRating"
                    value={value.toString()}
                    checked={formData.coffeeRating === value.toString()}
                    onChange={handleChange}
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
                    value={value.toString()}
                    checked={formData.foodRating === value.toString()}
                    onChange={handleChange}
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
                    value={value.toString()}
                    checked={formData.seatingRating === value.toString()}
                    onChange={handleChange}
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
                    value={value.toString()}
                    checked={formData.chargingRating === value.toString()}
                    onChange={handleChange}
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
                    value={value.toString()}
                    checked={formData.noiseRating === value.toString()}
                    onChange={handleChange}
                  />
                  {value}
                </label>
              ))}
            </div>
            <div>
              <label>Comment:</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit Review</button>
          </form>
        </>
      ) : (
        <p>Loading review data...</p>
      )}
    </div>
  );
};

export default EditReview;
