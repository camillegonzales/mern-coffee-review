import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { URL_NEIGHBORHOODS, URL_SHOPS } from '../utils/URL';

const SearchPage = () => {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [selectedRatingType, setSelectedRatingType] = useState('');
  const [coffeeShops, setCoffeeShops] = useState([]);

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        const response = await axios.get(URL_NEIGHBORHOODS);
        setNeighborhoods(response.data.data);
      } catch (error) {
        console.error('Error fetching neighborhoods:', error);
      }
    };

    fetchNeighborhoods();
  }, []);

  const fetchCoffeeShops = async () => {
    try {
      const params = {};

      if (selectedNeighborhood) {
        params.neighborhood = selectedNeighborhood;
      }

      if (selectedRatingType) {
        params.ratingType = selectedRatingType;
      }

      const response = await axios.get(URL_SHOPS, { params });
      setCoffeeShops(response.data.data);
    } catch (error) {
      console.error('Error fetching coffee shops:', error);
    }
  };

  const handleNeighborhoodChange = (event) => {
    setSelectedNeighborhood(event.target.value);
  };

  const handleRatingTypeChange = (event) => {
    setSelectedRatingType(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchCoffeeShops();
  };

  return (
    <div>
      <h1>Search Page</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Neighborhood:</label>
          <select value={selectedNeighborhood} onChange={handleNeighborhoodChange}>
            <option value="">All Neighborhoods</option>
            {neighborhoods.map((neighborhood) => (
              <option key={neighborhood._id} value={neighborhood._id}>{neighborhood.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Rating Type:</label>
          <select value={selectedRatingType} onChange={handleRatingTypeChange}>
            <option value="">All Ratings</option>
            <option value="coffeeRating">Coffee Rating</option>
            <option value="foodRating">Food Rating</option>
            <option value="seatingRating">Seating Rating</option>
            <option value="chargingRating">Charging Rating</option>
            <option value="noiseRating">Noise Rating</option>
          </select>
        </div>
        <button type="submit">Search</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Neighborhood</th>
            <th>Coffee Rating</th>
            <th>Food Rating</th>
            <th>Seating Rating</th>
            <th>Charging Rating</th>
            <th>Noise Rating</th>
          </tr>
        </thead>
        <tbody>
          {coffeeShops.map((coffeeShop) => (
            <tr key={coffeeShop._id}>
              <td><Link to={`/shop/${coffeeShop._id}`}>{coffeeShop.name}</Link></td>
              <td>{coffeeShop.neighborhood.name}</td> {/* Assuming neighborhood object has 'name' property */}
              <td>{coffeeShop.coffeeRating || 'N/A'}</td>
              <td>{coffeeShop.foodRating || 'N/A'}</td>
              <td>{coffeeShop.seatingRating || 'N/A'}</td>
              <td>{coffeeShop.chargingRating || 'N/A'}</td>
              <td>{coffeeShop.noiseRating || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchPage;
