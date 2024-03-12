import { createContext, useReducer } from "react";
import axios from "axios";
import {
  REVIEW_CREATION_SUCCESS,
  REVIEW_CREATION_FAIL,
  REVIEW_DELETION_SUCCESS,
  REVIEW_DELETION_FAIL,
  REVIEW_UPDATE_SUCCESS,
  REVIEW_UPDATE_FAIL
} from "./reviewActionTypes";
import { URL_REVIEWS } from "../../utils/URL";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const reviewContext = createContext();

// Initial State
const INITIAL_STATE = {
  review: null,
  reviews: [],
  loading: false,
  error: null,
  token: JSON.parse(localStorage.getItem("userAuth"))
};

// Reducer
const reviewReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // Create
    case REVIEW_CREATION_SUCCESS:
      return {
        ...state,
        review: payload,
        loading: false,
        error: null,
      };
    case REVIEW_CREATION_FAIL:
      return {
        ...state,
        review: null,
        loading: false,
        error: payload,
      };

    // Delete
    case REVIEW_DELETION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case REVIEW_DELETION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    
    // Update
    case REVIEW_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case REVIEW_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

// Provider
const ReviewContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reviewReducer, INITIAL_STATE);
  const navigate = useNavigate();

  // Create Review Action
  const createReviewAction = async (formData) => {
    console.log(state?.userAuth);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.token?.token}`,
      },
    };
    try {
      const res = await axios.post(URL_REVIEWS, formData, config);
      console.log(res)
      if (res?.data?.status === "success") {
        dispatch({
          type: REVIEW_CREATION_SUCCESS,
          payload: res?.data,
        });
        toast.success('Review added successfully');
        navigate(`/shop/${formData.coffeeShop}`)
      } else {
        toast.error(res.data.error)
      }
    } catch (error) {
      dispatch({
        type: REVIEW_CREATION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  // Delete Review Action
  const deleteReviewAction = async (reviewId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${state?.token?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.delete(`${URL_REVIEWS}/${reviewId}`, config);
      if (res?.data?.status === "success") {
        dispatch({
          type: REVIEW_DELETION_SUCCESS,
        });
      } else {
        toast.error(res.data.error)
      }
    } catch (error) {
      dispatch({
        type: REVIEW_DELETION_FAIL,
        payload: error?.response?.data?.message || 'Failed to delete review',
      });
    }
  };

  // Update Review Action
  const updateReviewAction = async (formData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${state?.token?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`${URL_REVIEWS}/${formData.reviewId}`, formData, config);
      if (res?.data?.status === "success") {
        dispatch({
          type: REVIEW_UPDATE_SUCCESS,
        });
        toast.success('Review updated successfully');
        const goBack = localStorage.getItem('goBack');
        navigate(`${goBack}`);
        localStorage.removeItem('goBack');
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      dispatch({
        type: REVIEW_UPDATE_FAIL,
        payload: error?.response?.data?.message || 'Failed to update review',
      });
    }
  };

  return (
    <reviewContext.Provider
      value={{
        createReviewAction,
        deleteReviewAction,
        updateReviewAction,
        review: state?.review,
        error: state?.error,
      }}
    >
      {children}
    </reviewContext.Provider>
  );
};

export default ReviewContextProvider;