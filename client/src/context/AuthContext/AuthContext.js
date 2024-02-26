import { createContext, useReducer } from "react";
import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAILED, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAIL } from "./authActionTypes";
import { URL_USER } from "../../utils/URL";

// Auth context
export const authContext = createContext();

// Initial state
const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    error: null,
    loading: false,
    profile: null
};

// Auth reducer
const reducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case LOGIN_SUCCESS:
            // Add user to local storage
            localStorage.setItem("userAuth", JSON.stringify(payload));
            return {
                ...state,
                loading: false,
                error: null,
                userAuth: payload
            };
        case LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                error: payload,
                userAuth: null
            };
        case FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                profile: payload
            };
        case FETCH_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
                profile: null
            };
        default:
            return state;
    }
};

// Provider
const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    console.log(state?.profile)

    // Login action
    const loginUserAction = async(formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        try {
            const res = await axios.post(
                `${URL_USER}/login`,
                formData, 
                config
            );
            if (res?.data?.status === 'success') {
                dispatch ({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                });
            }
        } catch (error) {
            dispatch ({
                type: LOGIN_FAILED,
                payload: error?.response?.data?.message,
            });
        }
    };

    // Profile action
    const fetchProfileAction = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state?.userAuth?.token}`
            },
        };
        const res = await axios.get(`${URL_USER}/profile`, config);
        if (res?.data?.status === 'success') {
            dispatch({
                type: FETCH_PROFILE_SUCCESS,
                payload: res.data
            });
        }
        try {
            
        } catch (error) {
            dispatch({
                type: FETCH_PROFILE_FAIL,
                payload: error?.response?.data?.message
            });
        }
    }

    return (
        <authContext.Provider 
            value={{
                loginUserAction,
                userAuth: state,
                fetchProfileAction,
                profile: state?.profile
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AuthContextProvider