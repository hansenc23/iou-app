import React, { Fragment } from 'react';
import spinner from '../assets/images/loading-spinner.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img src={spinner} style={{ width: '70px' }} alt='Loading...' />
    </Fragment>
  );
};

export default Spinner;
