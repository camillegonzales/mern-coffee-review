import { useLocation, useHistory } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

const AddReview = () => {
  const location = useLocation();
  const shop = location.state?.shop;

  return (
    <div>
      <h1>Rate & Review</h1>
      <p>Coffee shop: {shop.name}</p>

    </div>
  );
};

export default AddReview;
