import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './RequestsPage.css';

const RequestsPage = () => {
  const { isAuth, setIsAuth, user, setUser, getUser } = useContext(AuthContext);

  //request page should be publicly accessible, so shouldnt require authenticated user
  //todo: use below method on favors page to get logged in user
  // useEffect(() => {
  //   getUser();
  // }, []);

  //const [] = useState(0);

  //useEffect(() => {});

  return <div className='placeholder'>Requests page here</div>;
};

export default RequestsPage;
