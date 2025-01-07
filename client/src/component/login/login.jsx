import React, { useState,useContext } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate  } from 'react-router-dom'; 
import { AccountContext } from '../../contest/AccountProvider';
const Login = () => {
  const { setAccount, account }=useContext(AccountContext);
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [formData, setFormData] = useState({
    email: '', // Change 'username' to 'email'
    password: '',
  });
  const history = useNavigate (); 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleRegisterClick = () => {
    navigate('/register'); // Redirect to the /register route when the button is clicked
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', formData);
      console.log(response.data.message);
      const { token , obj} = response.data.message;
      // Do something with the received token, e.g., store it in local storage or global state.
      localStorage.setItem("token", response.data.message.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAccount(obj);
      console.log("Pranjal is printing the account",account)
      // console.log("pranjal is printing Account from logi Api",account);
      history('/problem')
    } catch (error) {
      // Handle login error here
      console.error('Login failed:', error.message);
      if (error.response && error.response.status === 405 && error.response.data.message === "Invalid credintail") {
        alert('entered wrong password please check your password.');
        // You can also redirect to the login page after showing the error message
        history('/login');
      }
      else{
        history('/register');
      }
    }
  };

  return (
    <>
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label> {/* Change 'username' to 'email' */}
            <input
              type="text"
              id="email" // Change 'username' to 'email'
              name="email" // Change 'username' to 'email'
              placeholder="Enter your email" // Change 'username' to 'email'
              value={formData.email} // Change 'username' to 'email'
              onChange={handleChange} // Change 'username' to 'email'
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          <button className="login-btn register-btn" onClick={handleRegisterClick}>Register</button>
          
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;