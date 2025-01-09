import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './HomePage.css';
import Nav from '../Profile/LeftNav';
import Login from '../login/login';
const HomePage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle the onClick event of the Login button
  const handleLoginClick = () => {
    navigate('/login'); // Redirect to the /login route when the button is clicked
  };
  const handleRegisterClick = () => {
    navigate('/register'); // Redirect to the /register route when the button is clicked
  };


  return (
    <>
    {/* <Nav/> */}
    <Login/>
    </>
  );
};

export default HomePage;