import { createContext, useReducer } from "react";
import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAILED } from "./authActionTypes";

// Auth context
export const authContext = createContext();

// Initial state
const INITIAL_STATE = {
    userAuth: null,
    error: null,
    loading: false,
    profile: null
};

// Auth reducer
const reducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case LOGIN_SUCCESS:
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
        default:
            return state;
    }
};

// Provider
const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    // Login action
    const loginUserAction = async(formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };
        try {
            const res = await axios.post(
                'http://localhost:9000/users/login', 
                formData, 
                config
            );
            if (res?.data?.status === 'success') {
                dispatch ({
                    type: 'LOGIN_SUCCESS',
                    payload: res.data,
                });
            }
        } catch (error) {
            dispatch ({
                type: 'LOGIN_FAILED',
                payload: error.data,
            });
        }
    }

    return (
        <authContext.Provider 
            value={{
                loginUserAction
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AuthContextProvider