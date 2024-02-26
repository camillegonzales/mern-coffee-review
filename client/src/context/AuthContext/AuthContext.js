const { createContext, useReducer } = require("react");

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

    return (
        <authContext.Provider 
            value={{
                isLogin: false,
                add: () => {}
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AuthContextProvider