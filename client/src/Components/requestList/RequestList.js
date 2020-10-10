import React, { useState, useEffect } from 'react';
import './RequestsList.css';
import './Request.css';
import CreateRequest from '../createRequest/CreateRequest';
import CompleteRequest from '../completeRequest/CompleteRequest';
import Spinner from '../../Components/Spinner';
import Moment from 'moment';
import moment from 'moment';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const RequestsList = ({ requestData, selectRequestId, setSelectedRequestID, isLoading }) => {
  const [date] = useState(Moment().format('Do MMMM YYYY'));

  const showRequestReward = () => {
    console.log('view and add request reward');
  };

  //   const deleteRequest = async (request_id) => {
  //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/request/delete`, {
  //       request_id: request_id,
  //     });
  //     if (response.status === 200) {
  //       //   requestData.forEach((request, i) => {
  //       //     if (request._id === request_id) {
  //       //       requestData.splice(i - 1, i);
  //       //     }
  //       //   });
  //     }
  //   };

  return (
    <div id='requests_list' className=''>
      <div className='header_container'>
        <div className='title_container'>
          <span className='requests_label'> Requests </span>
          <span className='date'> {date} </span>
            <div className="search_bar">
                <InputBase
                    className="search_input"
                    placeholder="Search Requests"
                />
                <IconButton type="submit" className="" aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </div>
        </div>
        <CreateRequest />
      </div>
      <div id='request' className=''>
        {isLoading ? (
          <Spinner />
        ) : (
          requestData.length !== 0 &&
          requestData.map((request) => {
            return (
              <div key={request._id} className='request_card' onClick={() => setSelectedRequestID(request._id)}>
                <div className='request_content'>
                  <div className='content_container_left'>
                    <div className='request_title'>{request.title}</div>
                    <div className='request_owner'>
                      Requested by <strong>{request.request_owner.username}</strong>
                    </div>
                  </div>
                  <div className='content_container_right'>
                    <button className='num_of_reward_btn' onClick={showRequestReward}>
                      <span className='num_of_rewards_label'>{request.rewards.length}</span>
                    </button>
                    <div className='reward'>
                      <span className='reward_label'> Rewards </span>
                    </div>
                  </div>
                </div>
                <div className='bottom_row'>
                  <div className='button_containers'>
                    <CompleteRequest
                      buttonSource={'fromRequestCard'}
                      requestName={request.title}
                      requestOwner={request.request_owner.username}
                      requestDate={moment(request.createdAt).format('DD MMM')}
                      requestRewards={request.rewards}
                      requestId={request._id}
                    />
                  </div>
                  <div className='request_date_container'>
                    <span className='date_label'> {moment(request.createdAt).format('DD MMM')} </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default RequestsList;
