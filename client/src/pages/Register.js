import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { authContext } from "../context/AuthContext/AuthContext";

const Register = () => {
  const { registerUserAction } = useContext(authContext);
  // Form data
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });
  const { userName, email, password } = formData;

  // onChange
  const onChangeInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit
  const onSubmitHandler = e => {
    e.preventDefault();
    
    // Dispatch action
    registerUserAction(formData);
  };

  return (
    <div className="form-container">
      <div className="form">
          <h1>Register for an account</h1>
          <form onSubmit={onSubmitHandler}>
              <label>Full Name</label>
              <input 
                onChange={onChangeInput}
                value={userName}
                name='userName'
                type='text' 
                placeholder='Enter full name...' 
              />

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

              <button className="form-button" type='submit'>Sign up</button>
        </form>
        <p>Already have an account? <Link to='/login'>Sign in</Link></p>
      </div>
    </div>
  );
};
  
  export default Register;
  