import React, { useState, createContext } from 'react';
import { Redirect } from 'react-router-dom';
import CONFIG from '../config';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState('');
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
  });

  const getUser = async () => {
    if (localStorage.getItem('isAuth') === 'true') {
      try {
        const res = await fetch(`https://www.iou-app.com/auth/getCurrentUser`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await res.json();
        if (res.status === 200) {
          //use local storage to persist state after logging in
          localStorage.setItem('id', data.id);
          localStorage.setItem('firstName', data.firstName);
          localStorage.setItem('lastName', data.lastName);
          setIsAuth(true);
          setUser({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('token expired or invalid. please login again');
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`https://www.iou-app.com/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem('isAuth', 'false');
        localStorage.removeItem('id');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser, getUser, logout }}>{props.children}</AuthContext.Provider>;
};
