import React, { Fragment } from 'react';
import spinnerSm from '../assets/images/loading-s.svg';

const Spinner = ({ width, padding }) => {
  return (
    <Fragment>
      <img src={spinnerSm} style={{ width: width ? width : '70px', padding: padding ? padding : '' }} alt='Loading...' />
    </Fragment>
  );
};

export default Spinner;
