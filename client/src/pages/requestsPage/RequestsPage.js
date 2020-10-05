import React, { useState, useEffect, useCallback } from 'react';
import './RequestsPage.css';
import RequestsList from '../../Components/requestList/RequestList';
import RequestDetail from '../../Components/requestDetail/RequestDetail';
import axios from "axios";

const RequestsPage = () => {

  const [selectedRequestID, setSelectedRequestID] = useState();

  const [requestData, setRequestData] = useState([]);

  const selectRequestId = useCallback((selectedID) => {
      setSelectedRequestID(selectedID);
  }, []);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/request/get_all`)
            .then((response) => {
                if (response.data.success) {
                    setRequestData(response.data.requests);
                    setSelectedRequestID(response.data.requests[0]._id);
                } else {
                    console.log("Failed to get request data");
                }
            }).catch(error => {
            console.log(error);
        })
    },  []);

    const selectedRequest = requestData.find( item => item._id === selectedRequestID);

  return (
      <div id='RequestsPage' className=''>
          <RequestsList
              requestData={requestData}
              selectRequestId={selectRequestId}
          />
          {(requestData && selectedRequest) ?
              <RequestDetail selectedRequest={selectedRequest}/> :
              <div className = "empty_RequestList"> Request Database is Empty </div> }
      </div>
  );
};

export default RequestsPage;
