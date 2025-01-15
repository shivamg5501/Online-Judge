import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './HomePage.css';
import Nav from '../Profile/LeftNav';
import Login from '../login/login';
const HomePage = () => {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/login'); 
  };
  const handleRegisterClick = () => {
    navigate('/register'); 
  };


  return (
    <>
    {/* <Nav/> */}
    <Login/>
    </>
  );
};

export default HomePage;