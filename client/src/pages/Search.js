import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { URL_NEIGHBORHOODS, URL_SHOPS } from '../utils/URL';

const SearchPage = () => {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [selectedRatingType, setSelectedRatingType] = useState('');
  const [coffeeShops, setCoffeeShops] = useState([]);

  // Fetch neighborhoods on component mount
  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        const response = await axios.get(`${URL_NEIGHBORHOODS}`);
        setNeighborhoods(response.data.data);
      } catch (error) {
        console.error('Error fetching neighborhoods:', error);
      }
    };

    fetchNeighborhoods();
  }, []);

  // Fetch coffee shops based on selected neighborhood and rating type
  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        const params = {};

        // Add neighborhood to params if selected
        if (selectedNeighborhood) {
          params.neighborhood = selectedNeighborhood;
        }

        // Add rating type to params if selected
        if (selectedRatingType) {
          params.ratingType = selectedRatingType;
        }

        const response = await axios.get(`${URL_SHOPS}`, { params });
        setCoffeeShops(response.data.data);
      } catch (error) {
        console.error('Error fetching coffee shops:', error);
      }
    };

    fetchCoffeeShops();
  }, [selectedNeighborhood, selectedRatingType]);

  // Handle neighborhood change
  const handleNeighborhoodChange = (event) => {
    setSelectedNeighborhood(event.target.value);
  };

  // Handle rating type change
  const handleRatingTypeChange = (event) => {
    setSelectedRatingType(event.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    // The coffee shops will be fetched automatically based on the selected neighborhood and rating type
  };

  return (
    <div>
      <h1>Search Page</h1>
      <div>
        <label>Neighborhood:</label>
        <select value={selectedNeighborhood} onChange={handleNeighborhoodChange}>
          <option value="">All Neighborhoods</option>
          {neighborhoods.map((neighborhood) => (
            <option key={neighborhood._id} value={neighborhood.name}>{neighborhood.name}</option>
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
      <button onClick={handleSearch}>Search</button>
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
          {coffeeShops.map((coffeeshop) => (
            <tr key={coffeeshop._id}>
              <td>{coffeeshop.name}</td>
              <td>{coffeeshop.neighborhood.name}</td>
              <td>{coffeeshop.coffeeRating}</td>
              <td>{coffeeshop.foodRating}</td>
              <td>{coffeeshop.seatingRating}</td>
              <td>{coffeeshop.chargingRating}</td>
              <td>{coffeeshop.noiseRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchPage;
