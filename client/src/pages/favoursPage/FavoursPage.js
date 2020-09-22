import React, { useState, useEffect, useContext, Component, Fragment } from 'react';
import './FavoursPage.css';
import FavoursList from '../../Components/favoursList/FavoursList';
import CreateFavour from '../../Components/createFavour/CreateFavour';
import { AuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom';

function FavoursPage() {
  const { isAuth, setIsAuth, user, setUser, getUser } = useContext(AuthContext);

  const renderPage = isAuth ? (
    <Fragment>
      <FavoursList />
      <CreateFavour />
    </Fragment>
  ) : (
    <Redirect to='/login'>{alert('Please login to view favours')}</Redirect>
  );

  return (
    <div id='FavoursPage' className=''>
      {renderPage}
    </div>
  );
}

export default FavoursPage;
