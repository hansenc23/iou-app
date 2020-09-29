import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuth, setIsAuth, user, setUser, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    setIsAuth('');
    setUser({
      id: '',
      firstName: '',
      lastName: '',
    });
    window.location.replace('/login');
  };

  const guestLinks = (
    <div className='authentication_links'>
      <div className='login_link'>
        <Link className='login_btn' to='/login'>Login</Link>
      </div>
      <div className='signup_link'>
        <Link to='/signup'>
          <button className='signup_link_label'>Sign Up</button>
        </Link>
      </div>
    </div>
  );

  const authLinks = (
    <div className='authentication_links auth'>
      <div className='login_link'>
        <p className='user_name'>{`Hi, ${user.firstName}`}</p>
      </div>
      <div className='signup_link'>
        <button onClick={onLogout} className='logout_btn'>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div id='navbar'>
        <nav role='navigation'>
          <div id='menuToggle'>
            <input type='checkbox' className='test' />

            <span></span>
            <span></span>
            <span></span>

            <ul id='menu'>
              <div className='page_link'>
                <Link to='/requests'>Requests</Link>
              </div>
              <div className='page_link'>
                <Link to='/favours'>Favours</Link>
              </div>
              <div className='page_link'>
                <Link to='/leaderboard'>Leaderboard</Link>
              </div>
            </ul>
          </div>
        </nav>
        <button className='logo'>
            <Link className='logo_link' to='/requests'> IOWEYOU </Link>
        </button>
        {isAuth ? authLinks : guestLinks}
    </div>
  );
};

export default Navbar;
