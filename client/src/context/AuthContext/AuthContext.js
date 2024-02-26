import { createContext, useReducer } from "react";
import axios from "axios";

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
    return {};
}

// Provider
const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    // Login action
    const loginUserAction = async(formData) => {
        const config = {
            headers: {
                "Content-Type:": "application/json"
            }
        };
        try {
            const res = await axios.post(
                'http://localhost:9000/users/login', 
                formData, 
                config
            );
            console.log(res);
        } catch (error) {
            console.log(error)
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