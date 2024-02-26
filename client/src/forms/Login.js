import { useContext } from "react";
import { authContext } from "../context/AuthContext/AuthContext";

const Login = () => {
  const state = useContext(authContext)
  console.log(state)
  return (
    <div>
        <h1>Login</h1>
        <form>
            <label>Email</label>
            <input type='email' placeholder='Enter email...' />
            <label>Password</label>
            <input type='password' placeholder='Enter password...' />
            <button type='submit'>Login</button>
        </form>
    </div>
  );
};

export default Login;
