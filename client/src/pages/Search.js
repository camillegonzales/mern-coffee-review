import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_SHOPS } from '../utils/URL';

const SearchPage = () => {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [selectedRatingCategory, setSelectedRatingCategory] = useState('');
  const [coffeeShops, setCoffeeShops] = useState([]);

  // Fetch neighborhoods and initialize component
  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        const response = await axios.get(`${URL_SHOPS}/neighborhoods`);
        setNeighborhoods(response.data);
      } catch (error) {
        console.error('Error fetching neighborhoods:', error);
      }
    };

    fetchNeighborhoods();
  }, []);

  // Fetch coffee shops based on selected filters
  const fetchCoffeeShops = async () => {
    try {
      const response = await axios.get(`${URL_SHOPS}/neighborhood/neighborhood=${selectedNeighborhood}&ratingType=${selectedRatingCategory}`);
      setCoffeeShops(response.data);
    } catch (error) {
      console.error('Error fetching coffee shops:', error);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    fetchCoffeeShops();
  };

  return (
    <div>
      <h1>Search Coffee Shops</h1>
      <div>
        {/* Dropdown for neighborhoods */}
        <label htmlFor="neighborhood">Neighborhood:</label>
        <select id="neighborhood" value={selectedNeighborhood} onChange={e => setSelectedNeighborhood(e.target.value)}>
          <option value="">Select Neighborhood</option>
          {neighborhoods.map(neighborhood => (
            <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
          ))}
        </select>
      </div>
      <div>
        {/* Dropdown for rating categories */}
        <label htmlFor="ratingCategory">Rating Category:</label>
        <select id="ratingCategory" value={selectedRatingCategory} onChange={e => setSelectedRatingCategory(e.target.value)}>
          <option value="">Select Rating Category</option>
          <option value="coffeeRating">Coffee Rating</option>
          <option value="foodRating">Food Rating</option>
          <option value="seatingRating">Seating Rating</option>
          <option value="chargingRating">Charging Rating</option>
          <option value="noiseRating">Noise Rating</option>
        </select>
      </div>
      <button onClick={handleSearch}>Search</button>
      {/* Table to display coffee shops */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Neighborhood</th>
            <th>{selectedRatingCategory}</th> {/* Display selected rating category as table header */}
          </tr>
        </thead>
        <tbody>
          {coffeeShops.map(coffeeShop => (
            <tr key={coffeeShop._id}>
              <td>{coffeeShop.name}</td>
              <td>{coffeeShop.neighborhood}</td>
              <td>{coffeeShop[selectedRatingCategory]}</td> {/* Display selected rating category value */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchPage;
