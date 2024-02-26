import { useContext, useState } from "react";
import { authContext } from "../context/AuthContext/AuthContext";

const Login = () => {
  const { loginUserAction, userAuth } = useContext(authContext);

  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  
  // onChange
  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit
  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Dispatch action
    loginUserAction(formData);
  };
  console.log(userAuth);

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={onSubmitHandler}>
          <label>Email</label>
          <input 
            onChange={onChangeInput}
            value={email}
            name='email' 
            type='email'
            placeholder='Enter email...' 
          />

          <label>Password</label>
          <input 
            onChange={onChangeInput}
            value={password}
            name='password' 
            type='password' 
            placeholder='Enter password...' 
          />

          <button type='submit'>Login</button>
        </form>
    </div>
  );
};

export default Login;
