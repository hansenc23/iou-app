import React, { useContext, useEffect, useState } from 'react';
import './DeleteRewards.css';
import axios from 'axios';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import { AuthContext } from '../../context/AuthContext';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Collapse from '@material-ui/core/Collapse';
import AlertMessage from '../AlertMessage';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

const rewardItems = ['Coffee', 'Chocolate', 'Pizza', 'Cupcake', 'Mint'];

const DeleteRewards = ({ rewardList }) => {
  const { isAuth, user } = useContext(AuthContext);

  const [storedReward, setStoredReward] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [alertMessage, setAlertMessage] = useState(null);

  const handleChangeRewards = (event) => {
    setStoredReward(event.target.value);
  };

  const handleConfirm = () => {
    //close Modal
    setOpen(false);
  };

  const handleOpen = () => {
    //open Modal
    setOpen(true);
  };

  const handleClose = () => {
    //close Modal
    setOpen(false);
  };

  useEffect(() => {
    if (alertMessage) {
      setTimeout(() => {
        setOpenAlert(false);
      }, 4000);
    }
  });

  const guestModal = (
    <div className='guest_modal_container'>
      <div className='guest_login_container'>
        <CloseIcon className='close_guest_completerequest' fontSize='large' onClick={handleClose} />
        <Link to='/login'>
          <button className='guest_login_link'> Login</button>
        </Link>
      </div>
      <div className='guest_signup_container'>
        <Link to='/signup'>
          <button className='guest_signup_link'> Sign up </button>
        </Link>
      </div>
    </div>
  );

  const authModal = (
    <div className='delete_rewards_modal_container'>
      <div className='delete_rewards_title'>Delete Rewards</div>
      <div className='delete_rewards_list_container'>
        <div className='delete_rewards_list'>
          {rewardList.length === 0 ? (
            <div className='delete_rewards_empty'>
              <p>You have not added any reward to this request</p>
            </div>
          ) : (
            rewardList.map((reward, i) => (
              <div key={i} className='delete_reward_item'>
                <div className='delete_reward_item_content'>
                  <button className='delete_reward_item_btn'>
                    <CloseOutlinedIcon />
                  </button>
                  <div className='delete_reward_detail'>
                    <strong> {reward.reward} </strong> from {user.username}
                  </div>
                </div>
                <div className='delete_reward_item_date'>05 Oct</div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className='delete_rewards_confirm_btn_container'>
        <button className='cancel_delete_rewards_btn' onClick={handleClose}>
          {' '}
          <span>Cancel</span>
        </button>
        <button className='confirm_delete_rewards_btn' onClick={handleConfirm}>
          {' '}
          <span>Confirm</span>
        </button>
      </div>
    </div>
  );

  return (
    <div id='EditRewards'>
      <button className='delete_reward_btn' onClick={handleOpen}>
        Delete Rewards
      </button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='delete_rewards_modal'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction='up' in={open} mountOnEnter unmountOnExit>
          {isAuth ? authModal : guestModal}
        </Slide>
      </Modal>
    </div>
  );
};
export default DeleteRewards;
