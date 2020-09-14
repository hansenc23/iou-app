<<<<<<< HEAD
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import './Navbar.css';
import Login from '../pages/loginPage/LoginPage';

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
        <Link to='/login'>Login</Link>
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
      <div className='page_links'>
        <nav role='navigation'>
          <div id='menuToggle'>
            <input type='checkbox' className='test' />

            <span></span>
            <span></span>
            <span></span>

            <ul id='menu'>
              <div className='page_links'>
                <Link to='/requests'>Requests</Link>
              </div>
              <div className='page_links'>
                <Link to='/favours'>Favours</Link>
              </div>
              <div className='page_links'>
                <Link to='/leaderboard'>Leaderboard</Link>
              </div>
            </ul>
          </div>
        </nav>
      </div>

      <div className='logo'>IOWEYOU</div>

      {isAuth ? authLinks : guestLinks}
    </div>
  );
};

export default Navbar;
=======
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Login from "../pages/loginPage/LoginPage";

class Navbar extends Component {

    render() {
        return (
            <div id="navbar">
                <div className="page_links">
                    <nav role="navigation">
                        <div id="menuToggle">
                            <input type="checkbox" className=""/>
                                <span></span>
                                <span></span>
                                <span></span>
                            <ul id="menu">
                                <div className="page_links">
                                    <Link to="/requests">Requests</Link>
                                </div>
                                <div className="page_links">
                                    <Link to="/favours">Favours</Link>
                                </div>
                                <div className="page_links">
                                    <Link to="/leaderboard">Leaderboard</Link>
                                </div>
                            </ul>
                        </div>
                    </nav>
                </div>

                <div className="logo">
                    IOWEYOU
                </div>

                <div className="authentication_links">
                    <div className="login_link">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="signup_link">
                        <button className= "signup_link_label">
                            <Link to="/signup">Sign Up</Link>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;
>>>>>>> aed91269755c6aea0947938a175d679552608bfd
