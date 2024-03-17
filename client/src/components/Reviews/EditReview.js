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
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`${URL_REVIEWS}/${id}`);
        const reviewData = response.data.data;
        setReview(reviewData);
        if (formData === null) {
          setFormData({
            reviewId: reviewData._id,
            coffeeRating: reviewData.coffeeRating.toString(),
            foodRating: reviewData.foodRating.toString(),
            seatingRating: reviewData.seatingRating.toString(),
            chargingRating: reviewData.chargingRating.toString(),
            noiseRating: reviewData.noiseRating.toString(),
            comment: reviewData.comment
          });
        }

        const coffeeShopResponse = await axios.get(`${URL_SHOPS}/${reviewData.coffeeShop}`);
        setCoffeeShop(coffeeShopResponse.data.data);
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };

    fetchReview();
  }, [id, formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReviewAction(formData); 
  };

  return (
    <div className="page">
        <h1>Edit Review</h1>
        {review && coffeeShop && formData ? (
          <div className="review-form">
            <h2>{coffeeShop.name}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="ratings">Coffee Rating:</label>
                <div className="ratings-key">
                  <p>1 = Appealing as a cup of lukewarm dishwater.</p>
                  <p>5 = A sip of heaven in every cup!</p>
                </div>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="radio-label">
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
                <label className="ratings">Food Rating:</label>
                <div className="ratings-key">
                  <p>1 = Tastebuds, beware!.</p>
                  <p>5 = A culinary masterpiece.</p>
                </div>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="radio-label">
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
                <label className="ratings">Seating Rating:</label>
                <div className="ratings-key">
                  <p>1 = Standing room only.</p>
                  <p>5 = First class seating.</p>
                </div>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="radio-label">
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
                <label className="ratings">Charging Rating:</label>
                <div className="ratings-key">
                  <p>1 = Charging purgatory.</p>
                  <p>5 = All devices are juiced up.</p>
                </div>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="radio-label">
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
                <label className="ratings">Noise Rating:</label>
                <div className="ratings-key">
                  <p>1 = Quiet as a library... during a rock concert.</p>
                  <p>5 = Like wearing noise-cancelling headphones.</p>
                </div>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="radio-label">
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

              <div className="textarea">
                <label>Comment:</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                />
              </div>

              <button className="search-button" type="submit">Submit Review</button>
            </form>
          </div>
        ) : (
          <p>Loading review data...</p>
        )}
    </div>
  );
};

export default EditReview;
