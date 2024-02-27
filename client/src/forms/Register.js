import { useState } from "react";
import { Link } from 'react-router-dom';

const Register = () => {
  // Form data
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });
  const {userName, email, password} = formData

  // onChange
  const onChangeInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Submit
  const onSubmitHandler = e => {
    if (!userName || !email || !password) {
      return alert("Please fill out all fields");
    }
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div>
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

              <button type='submit'>Sign up</button>
              <p>Already have an account? <Link to='/login'>Sign in</Link></p>
        </form>
    </div>
  );
};
  
  export default Register;
  