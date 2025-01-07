import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';
import Nav from '../Profile/LeftNav';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    reEnterPassword: '',
  });

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleLoginClick = () => {
    navigate('/'); // Redirect to the /register route when the button is clicked
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/register', formData);
      // Handle the response if needed
      const { token } = response.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/problem')
    } catch (error) {
      // Handle registration error here
      console.error('Registration failed:', error.message);
      if (error.response && error.response.status === 400 && error.response.data.message === "User already exist") {
        // If so, show an error message to the user or take appropriate actions.
        alert('User already exists. Please login or use a different email.');
        // You can also redirect to the login page after showing the error message
        navigate('/login');
      }
    }
  };

  return (
    <>
    <Nav/>
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
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
          <div className="form-group">
            <label htmlFor="reEnterPassword">Re-enter Password</label>
            <input
              type="password"
              id="reEnterPassword"
              name="reEnterPassword"
              placeholder="Re-enter your password"
              value={formData.reEnterPassword}
              onChange={handleChange}
            />
          </div>
          <button className="login-btn" type="submit" onClick={handleLoginClick}>
            Login
          </button>
          <button className="register-btn" type="submit">
            Register
          </button>

        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
