import React, { useRef, useState, useEffect, useContext } from 'react';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import NewRequestTitle from '../newRequestTitle/NewRequestTitle';
import './CreateRequest.css';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import SubjectIcon from '@material-ui/icons/Subject';
import CardGiftcardSharpIcon from '@material-ui/icons/CardGiftcardSharp';
import Collapse from '@material-ui/core/Collapse';
import AlertMessage from '../AlertMessage';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';

const rewardItems = ['Coffee', 'Chocolate', 'Pizza', 'Cupcake', 'Mint'];

const CreateRequest = () => {
  const { isAuth, user } = useContext(AuthContext);

  const [storedRequestTitle, setStoredRequestTitle] = useState('New Request Title Here');
  const [storedDescription, setStoredDescription] = useState('');
  const [storedReward, setStoredReward] = useState([]);

  const [openModal, setOpenModal] = React.useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [error, setError] = useState('');

  const handleChangeRewards = (event) => {
    setStoredReward(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setStoredDescription(event.target.value);
  };

  const handleOpen = () => {
    //open Modal
    setOpenModal(true);
  };

  const handleClose = () => {
    //open Modal
    setOpenModal(false);
  };

  function handleSuccess() {
    //reset form values
    resetValues();

    setOpenModal(false);
    window.location.reload(false);
  }

  function handleClickCancel() {
    //reset form values
    resetValues();
    //close Modal
    setOpenModal(false);
  }

  let btnRef = useRef();
  const disableButton = (e) => {
    if (btnRef.current) {
      btnRef.current.setAttribute('disabled', 'disabled');
    }
  };

  async function handleCreateRequest() {
    //form checks
    if (storedRequestTitle === 'New Request Title Here') {
      setOpenAlert(true);
      setError('Please enter a request title');
    } else if (storedDescription === '') {
      setOpenAlert(true);
      setError('Please enter a description');
    } else if (storedReward.length === 0) {
      setOpenAlert(true);
      setError('Please select at least one reward');
    } else {
      try {
        disableButton();

        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/request/create`,
          {
            owner: localStorage.getItem('id'),
            title: storedRequestTitle,
            description: storedDescription,
            reward: storedReward,
            completedBy: null,
          },
          { withCredentials: true }
        );

        if (res.status === 200) {
          //disable button to prevent multiple submissions
          handleSuccess();
        } else {
          console.log('Create request failed');
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  function resetValues() {
    setStoredRequestTitle('New Request Title Here');
    setStoredReward([]);
    setStoredDescription();
  }

  //set timeout when alert is displayed
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setOpenAlert(false);
      }, 4000);
    }
  });

  const guestModal = (
    <div className='guest_modal_container'>
      <div className='guest_login_container'>
        <CloseIcon className='close_guest_createrequest' fontSize='large' onClick={handleClose} />
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
    <div className='createRequest_modal_container'>
      <div className='create_request_tile_container'>
        <div className='create_request_title_header'>
          <FiberNewIcon className='create_request_title_icon' />
          <div className='create_request_title'>
            <NewRequestTitle className='' text={storedRequestTitle} onSetText={(text) => setStoredRequestTitle(text)} />
          </div>
        </div>
        <div className='requested_by_text'>
          Requested by <strong> {`${user.username}`} </strong>
        </div>
      </div>
      <div className='request_description_container'>
        <div className='request_description_header'>
          <SubjectIcon className='request_description_icon' />
          <div className='request_description_label'>Description</div>
        </div>
        <div className='request_description_input'>
          <TextField
            className='request_description_textfield'
            placeholder='Add a more detailed description'
            multiline
            value={storedDescription}
            onChange={handleChangeDescription}
            rows={5}
            variant='outlined'
            InputProps={{ style: { color: 'black', fontSize: 15, fontWeight: 600, fontFamily: 'Poppins' } }}
          />
        </div>
      </div>
      <div className='request_reward_container'>
        <div className='request_reward_header'>
          <CardGiftcardSharpIcon className='request_reward_icon' />
          <div className='request_reward_label'>Reward</div>
        </div>
        <div className='request_reward_input'>
          <FormControl className='request_reward_form'>
            <InputLabel id='' htmlFor='name' />
            <Select
              variant='outlined'
              multiple
              value={storedReward}
              onChange={handleChangeRewards}
              renderValue={(selected) => (
                <div className=''>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className='request_reward_chip' />
                  ))}
                </div>
              )}
              MenuProps={{ PaperProps: { style: { maxHeight: 50, backgroundColor: '#f3f0ea' } } }}
            >
              {rewardItems.map((item) => (
                <MenuItem className='menu_test' key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='create_request_alert'>
          <Collapse in={openAlert}>
            {error && (
              <AlertMessage severity='error'>
                <strong>{error}</strong>
              </AlertMessage>
            )}
          </Collapse>
        </div>
      </div>
      <div className='request_button_containers'>
        <button className='cancel_request_btn' onClick={handleClickCancel}>
          {' '}
          <span>Cancel</span>
        </button>
        <button className='create_request_btn' ref={btnRef} onClick={handleCreateRequest}>
          {' '}
          <span>Create Request</span>
        </button>
      </div>
    </div>
  );

  return (
    <div id='createRequest'>
      <div className='new_requests_btn_container'>
        <button className='new_requests_btn' onClick={handleOpen}>
          <AddIcon className='add_icon' fontSize='large' />
        </button>
      </div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='createRequest_modal'
        open={openModal}
        onClose={handleClickCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Slide direction='up' in={openModal} mountOnEnter unmountOnExit>
          {isAuth ? authModal : guestModal}
        </Slide>
      </Modal>
    </div>
  );
};

export default CreateRequest;
