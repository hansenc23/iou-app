import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './RequestsPage.css';
import RequestsList from '../../Components/requestList/RequestList';
import RequestDetail from '../../Components/requestDetail/RequestDetail';

const RequestsPage = () => {
  const { isAuth, setIsAuth, user, setUser, getUser } = useContext(AuthContext);

  const [selectedRequestID, setSelectedRequestID] = useState(-1)

  //request page should be publicly accessible, so shouldnt require authenticated user
  //todo: use below method on favors page to get logged in user
  useEffect(() => {
    getUser();
  }, []);

  function getSelectedRequestID(selectedID) {
      setSelectedRequestID(selectedID);
  }

  return (
    <div id='RequestsPage' className=''>
      <RequestsList
          getSelectedRequestID={getSelectedRequestID}
      />
      <RequestDetail
        selectedRequestID={selectedRequestID}
      />
    </div>
  );
};

export default RequestsPage;
