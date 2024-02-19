const Register = () => {
    return (
      <div>
            <h1>Login</h1>
            <form>
                <label>Name</label>
                <input type='text' placeholder='Enter full name...' />
                <label>Email</label>
                <input type='email' placeholder='Enter email...' />
                <label>Password</label>
                <input type='password' placeholder='Enter password...' />
                <button type='submit'>Login</button>
          </form>
      </div>
    );
  };
  
  export default Register;
  