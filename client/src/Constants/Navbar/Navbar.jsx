import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <div id='navbar-main' className='flex-row'>
      <Link to={'/'}>
        <div className="logo-box flex-row ">
          <img className='logo' src="https://as1.ftcdn.net/v2/jpg/02/58/08/80/1000_F_258088002_JS9GACAq0rknxuoZJyGI1BIt99JiMxJV.jpg" alt="logo" />
          <p>Home</p>
        </div>
      </Link>
      <div className="nav-options nuk">
        <Link to={'/problemset/all/'} >Problems</Link>
      </div>
      <div className="nav-options">
        <Link to={'/signup'} >Signup</Link>
      </div>
      <div className="nav-options">
        <Link to={'/login'} >Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
