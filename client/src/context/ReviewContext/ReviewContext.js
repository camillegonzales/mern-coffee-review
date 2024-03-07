import { createContext, useReducer } from "react";
import axios from "axios";
import {
  REVIEW_DETAILS_SUCCESS,
  REVIEW_DETAILS_FAIL,
  REVIEW_CREATION_SUCCESS,
  REVIEW_CREATION_FAIL,
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
    // Details
    case REVIEW_DETAILS_SUCCESS:
      return {
        ...state,
        review: payload,
        loading: false,
        error: null,
      };
    case REVIEW_DETAILS_FAIL:
      return {
        ...state,
        review: null,
        loading: false,
        error: payload,
      };
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
    default:
      return state;
  }
};

// Provider
const ReviewContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reviewReducer, INITIAL_STATE);
  const navigate = useNavigate();

  // Get Review Details Action
  const getReviewDetailsAction = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${state?.token?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(`${URL_REVIEWS}/${id}`, config);
      if (res?.data?.status === "success") {
        dispatch({
          type: REVIEW_DETAILS_SUCCESS,
          payload: res?.data?.data,
        });
      } else {
        toast.error(res.data.error)
      }
    } catch (error) {
      dispatch({
        type: REVIEW_DETAILS_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

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

  return (
    <reviewContext.Provider
      value={{
        getReviewDetailsAction,
        createReviewAction,
        review: state?.review,
        error: state?.error,
      }}
    >
      {children}
    </reviewContext.Provider>
  );
};

export default ReviewContextProvider;