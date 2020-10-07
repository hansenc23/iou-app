import React, { useState, useEffect, useCallback, useContext } from 'react';
import './RequestsPage.css';
import RequestsList from '../../Components/requestList/RequestList';
import RequestDetail from '../../Components/requestDetail/RequestDetail';
import { AuthContext } from '../../context/AuthContext';
import spinner from '../../Components/Spinner';
import axios from 'axios';

const RequestsPage = () => {
  const { isAuth, setIsAuth, user, setUser, getUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedRequestID, setSelectedRequestID] = useState('');

  const [requestData, setRequestData] = useState([]);

  const selectRequestId = useCallback((selectedID) => {
    setSelectedRequestID(selectedID);
  });

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/request/get_all`)
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          setRequestData(response.data.requests);
          // setSelectedRequestID(response.data.requests[0]._id);
        } else {
          console.log('Failed to get request data');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const selectedRequest = requestData.find((item) => item._id === selectedRequestID);

  return (
    <div id='RequestsPage' className=''>
      <RequestsList requestData={requestData} selectRequestId={selectRequestId} setSelectedRequestID={setSelectedRequestID} isLoading={isLoading} />
      {requestData && selectedRequest ? (
        <RequestDetail selectedRequest={selectedRequest} requestData={requestData} />
      ) : (
        <div className='empty_RequestList'> Select a request to view more details </div>
      )}
    </div>
  );
};

export default RequestsPage;
