import React from 'react';
import Alert from '@material-ui/lab/Alert';

const AlertMessage = (props) => {
  return (
    <Alert variant='filled' severity={props.severity}>
      {props.children}
    </Alert>
  );
};

export default AlertMessage;
