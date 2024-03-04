import { createContext, useReducer } from "react";
import axios from "axios";
import { 
    LOGIN_SUCCESS, 
    LOGIN_FAILED, 
    FETCH_PROFILE_SUCCESS, 
    FETCH_PROFILE_FAIL, 
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./authActionTypes";
import { URL_USER } from "../../utils/URL";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
        // Register
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userAuth: payload
            };
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
                userAuth: null
            };

        // Login
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
        
        // Profile
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

        // Logout
        case LOGOUT:
            // Remove user from local storage
            localStorage.removeItem("userAuth");
            return {
                ...state,
                loading: false,
                error: null,
                userAuth: null
            };
        default:
            return state;
    }
};

// Provider
const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    console.log(state?.profile)
    const navigate = useNavigate();

    // Login action
    const loginUserAction = async (formData) => {
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
                const pendingShopId = localStorage.getItem('pendingShopId');
                if (pendingShopId) {
                // If shop ID present, redirect back to the shop profile page of that shop
                navigate(`/add-review/${pendingShopId}`);
                localStorage.removeItem('pendingShopId');
                } else {
                // Otherwise, redirect to the default route after login
                navigate('/profile');
                }
            } else {
                toast.error(res.data.error)
            }
        } catch (error) {
            dispatch ({
                type: LOGIN_FAILED,
                payload: error?.response?.data?.message,
            });
        }
    };

    // Register action
    const registerUserAction = async (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        try {
            const res = await axios.post(
                `${URL_USER}/register`,
                formData, 
                config
            );
            if (res?.data?.status === 'success') {
                dispatch ({
                    type: REGISTER_SUCCESS,
                    payload: res.data,
                });
                toast.success('Sign-up successful. Welcome!');
                // Delay redirect by 2 seconds to show notification
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                toast.error(res.data.error)
            }
        } catch (error) {
            dispatch ({
                type: REGISTER_FAIL,
                payload: error?.response?.data?.message,
            });
        }
    };

    // Profile action
    const fetchProfileAction = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state?.userAuth?.token}`
                },
            };
            const res = await axios.get(`${URL_USER}/profile`, config);
            if (res?.data) {
                dispatch({
                    type: FETCH_PROFILE_SUCCESS,
                    payload: res.data
                });
            }
        } catch (error) {
            dispatch({
                type: FETCH_PROFILE_FAIL,
                payload: error?.response?.data?.message
            });
        }
    };

    // Log out action
    const logoutUserAction = () => {
        dispatch({
            type: LOGOUT,
            payload: null
        });
        // Redirect
        window.location.href = '/login';
    };

    return (
        <authContext.Provider 
            value={{
                loginUserAction,
                userAuth: state,
                token: state?.userAuth?.token,
                fetchProfileAction,
                profile: state?.profile,
                error: state?.error,
                logoutUserAction,
                registerUserAction
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AuthContextProvider;