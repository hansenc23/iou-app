import React, { useRef, useState, useEffect, useContext } from 'react';
import './RequestDetail.css';
import CompleteRequest from '../completeRequest/CompleteRequest';
import moment from 'moment';
import axios from 'axios';
import AddRewards from '../addRewards/AddRewards';
import { AuthContext } from '../../context/AuthContext';
import DeleteRewards from '../deleteRewards/DeleteRewards';

const RequestDetail = ({ selectedRequest, requestData }) => {
  const { isAuth, user } = useContext(AuthContext);

  //an array containing the rewards added by the logged in user
  const [rewardList, setRewardList] = useState([]);

  //get current logged in user using user.username

  useEffect(() => {
    if (isAuth === true) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/request/reward/get?request_id=${selectedRequest._id}&reward_owner_id=${user.id}`)
        .then((response) => {
          response.data.rewards.forEach((reward) => {
            rewardList.push(reward);
          });
        });

      if (rewardList.length > 0) {
        setRewardList([]);
      }
    }
  });

  return (
    <div id='requestDetail'>
      <div className='request_title_container'>
        <div className='request_name'>{selectedRequest.title}</div>
        <div className='request_subtitle'>
          <span>
            {' '}
            Requested by <strong> @{selectedRequest.request_owner.username} </strong>
          </span>
          <span className='sub_title_date'> on {moment(selectedRequest.createdAt).format('DD MMM')} </span>
        </div>
      </div>
      <CompleteRequest
        buttonSource={'fromRequestDetail'}
        requestName={selectedRequest.title}
        requestOwner={selectedRequest.request_owner.username}
        requestDate={selectedRequest.createdAt}
      />
      <div className='description_details_container'>
        <div className='description_detail_header'>Details</div>
        <div className='description_detail_content'>{selectedRequest.description}</div>
      </div>

      <div className='reward_details_container'>
        <div className='reward_detail_header'>Rewards</div>
        <div className='reward_detail_list'>
          {selectedRequest.rewards.length !== 0 &&
            selectedRequest.rewards.map((reward) => {
              return (
                <div key={reward._id} className='reward_item'>
                  <div className='reward_item_content'>
                    <div className='reward_detail'>
                      <strong>{reward.reward}</strong> from {reward.owner.username}
                    </div>
                  </div>
                  <div className='reward_item_date'>
                    <div className=''>{moment(reward.createdAt).format('DD MMM')}</div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className='edit_reward_btn_container'>
          <AddRewards selectedRequestId={selectedRequest._id} />
          <DeleteRewards rewardList={rewardList} selectedRequest={selectedRequest} />
        </div>
      </div>
    </div>
  );
};
export default RequestDetail;
