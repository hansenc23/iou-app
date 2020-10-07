import React, { useContext, useEffect, useState } from 'react';
import './AddRewards.css';
import axios from 'axios';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import { AuthContext } from '../../context/AuthContext';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import AlertMessage from '../AlertMessage';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

const rewardItems = ['Coffee', 'Chocolate', 'Pizza', 'Cupcake', 'Mint'];

const AddRewards = ({ selectedRequestId }) => {
  const { isAuth, user } = useContext(AuthContext);

  const [storedReward, setStoredReward] = useState('');

  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangeRewards = (event) => {
    setStoredReward(event.target.value);
  };

  const handleConfirm = async () => {
    if (storedReward === '') {
      setOpenAlert(true);
      setError('Please select a reward');
    } else {
      console.log(storedReward, selectedRequestId);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/request/add_reward`, {
        request_id: selectedRequestId,
        reward: storedReward,
        reward_owner: user.id,
      });

      if (response.status === 200) {
        alert('Reward added successfully');
        window.location.reload(false);
      }

      if (response.status === 400) {
        setOpenAlert(true);
        setError('Failed to add reward');
      }
    }
  };

  const handleOpen = () => {
    //open Modal
    setOpen(true);
  };

  const handleClose = () => {
    //close Modal
    setOpen(false);

    //reset values
    setStoredReward('');
  };

  //set timeout when alert is displayed
  useEffect(() => {
    if (error || success) {
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
    <div className='add_rewards_modal_container'>
      <div className='add_rewards_title'>Add Rewards</div>
      <div className='add_rewards_container'>
        <FormControl className='add_request_reward_form'>
          <InputLabel id='' htmlFor='name' />
          <Select
            variant='outlined'
            value={storedReward}
            onChange={handleChangeRewards}
            MenuProps={{ PaperProps: { style: { maxHeight: 50, backgroundColor: '#f3f0ea' } } }}
          >
            {rewardItems.map((item) => (
              <MenuItem className='menu_test' key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className='add_request_alert'>
          <Collapse in={openAlert}>
            {error && (
              <AlertMessage severity='error'>
                <strong>{error}</strong>
              </AlertMessage>
            )}
          </Collapse>
          <Collapse in={openAlert}>
            {success && (
              <AlertMessage severity='success'>
                <strong>{success}</strong>
              </AlertMessage>
            )}
          </Collapse>
        </div>
      </div>
      <div className='add_rewards_confirm_btn_container'>
        <button className='cancel_add_rewards_btn' onClick={handleClose}>
          {' '}
          <span>Cancel</span>
        </button>
        <button className='confirm_add_rewards_btn' onClick={handleConfirm}>
          {' '}
          <span>Confirm</span>
        </button>
      </div>
    </div>
  );

  return (
    <div id='EditRewards'>
      <button className='add_reward_item_btn' onClick={handleOpen}>
        Add Rewards
      </button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='add_rewards_modal'
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
export default AddRewards;
