import React, { useState, useEffect } from 'react';
import './FavoursPage.css';
import FavoursList from '../../Components/favoursList/FavoursList';
import CreateFavour from '../../Components/createFavour/CreateFavour';

function FavoursPage() {
  const [] = useState(0);

  useEffect(() => {});

  return (
    <div id='FavoursPage' className=''>
      <FavoursList />
      <CreateFavour />
    </div>
  );
}

export default FavoursPage;
