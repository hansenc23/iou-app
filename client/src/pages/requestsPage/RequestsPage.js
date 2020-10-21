import React, { useState, useEffect, useCallback, useContext } from 'react';
import './RequestsPage.css';
import RequestsList from '../../Components/requestList/RequestList';
import RequestDetail from '../../Components/requestDetail/RequestDetail';
import { AuthContext } from '../../context/AuthContext';
import Spinner from '../../Components/Spinner';
import axios from 'axios';

const RequestsPage = () => {
  const { isAuth, setIsAuth, user, setUser, getUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedRequestID, setSelectedRequestID] = useState('');

  const [requestData, setRequestData] = useState([]);

  const [limit, setLimit] = useState(6);

  const [skip, setSkip] = useState(0);

  //bool to check if response data is empty
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchRequest = (limit, skip) =>{
    axios
      .get(`${process.env.REACT_APP_API_URL}/request/get_all?limit=${limit}&skip=${skip}`)
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          setRequestData((prev) => [...prev, ...response.data.requests])
          
          
          if(response.data.requests.length < limit){
            setIsEmpty(true);    
          }
        } else {
          console.log('Failed to get request data');
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const selectRequestId = useCallback((selectedID) => {
    setSelectedRequestID(selectedID);
  });


  const handleScroll = (e) =>{
    const {scrollTop, clientHeight, scrollHeight} = e.currentTarget;
    if(Math.round(scrollHeight - scrollTop) === clientHeight && isEmpty === false){
      setSkip(limit + skip);
    }
  }


  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    fetchRequest(limit, skip);
    
  }, [limit, skip]);

  const selectedRequest = requestData.find((item) => item._id === selectedRequestID);

  return (
    <div id='RequestsPage' className=''>
      <RequestsList isEmpty={isEmpty} onscroll={(e) => {handleScroll(e)}} requestData={requestData} selectRequestId={selectRequestId} setSelectedRequestID={setSelectedRequestID} isLoading={isLoading} />
      
      {requestData && selectedRequest ? (
        <RequestDetail selectedRequest={selectedRequest} requestData={requestData} />
      ) : (
        <div className='empty_RequestList'> Select a request to view more details </div>
      )}
    </div>
  );
};

export default RequestsPage;
