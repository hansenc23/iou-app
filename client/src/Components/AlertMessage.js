import React from 'react';
import Alert from '@material-ui/lab/Alert';

const AlertMessage = (props) => {
  return (
    <Alert variant='outlined' severity={props.severity}>
      {props.children}
    </Alert>
  );
};

export default AlertMessage;
