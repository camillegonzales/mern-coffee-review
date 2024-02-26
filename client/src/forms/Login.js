import { useContext } from "react";

useContext

const Login = () => {
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
