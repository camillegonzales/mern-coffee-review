import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { URL_NEIGHBORHOODS, URL_SHOPS } from '../utils/URL';

const SearchPage = () => {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [selectedRatingType, setSelectedRatingType] = useState('');
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [showTable, setShowTable] = useState(false);

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
      setShowTable(true);
    } catch (error) {
      console.error('Error fetching coffee shops:', error);
    }
  };

  const handleNeighborhoodChange = (e) => {
    setSelectedNeighborhood(e.target.value);
  };

  const handleRatingTypeChange = (e) => {
    setSelectedRatingType(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchCoffeeShops();
  };

  return (
    <div className='search-page'>
      <h1>Search Page</h1>
      <form className='search-form' onSubmit={handleFormSubmit}>
          <label>Neighborhood:</label>
          <select className='form-object' value={selectedNeighborhood} onChange={handleNeighborhoodChange}>
            <option value="">All Neighborhoods</option>
            {neighborhoods.map((neighborhood) => (
              <option key={neighborhood._id} value={neighborhood._id}>{neighborhood.name}</option>
            ))}
          </select>
          <label>Rating Type:</label>
          <select className='form-object' value={selectedRatingType} onChange={handleRatingTypeChange}>
            <option value="">All Ratings</option>
            <option value="coffeeRating">Coffee Rating</option>
            <option value="foodRating">Food Rating</option>
            <option value="seatingRating">Seating Rating</option>
            <option value="chargingRating">Charging Rating</option>
            <option value="noiseRating">Noise Rating</option>
          </select>
        <button className='search-button' type="submit">Search</button>
      </form>

      {showTable && (
        <table>
          <thead>
            <tr>
              <th>Coffee Shop</th>
              <th>Neighborhood</th>
              <th>Coffee</th>
              <th>Food</th>
              <th>Seating</th>
              <th>Charging</th>
              <th>Noise</th>
            </tr>
          </thead>
          <tbody>
            {coffeeShops.map((coffeeShop) => (
              <tr key={coffeeShop._id}>
                <td><Link to={`/shop/${coffeeShop._id}`}>{coffeeShop.name}</Link></td>
                <td>{coffeeShop.neighborhood.name}</td> 
                <td>{coffeeShop.coffeeRating || 'N/A'}</td>
                <td>{coffeeShop.foodRating || 'N/A'}</td>
                <td>{coffeeShop.seatingRating || 'N/A'}</td>
                <td>{coffeeShop.chargingRating || 'N/A'}</td>
                <td>{coffeeShop.noiseRating || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchPage;
