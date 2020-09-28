import React, { useEffect, useState, useContext } from 'react';
import './CreateFavour.css';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import InlineText from '../inlineText/InlineText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AlertMessage from '../AlertMessage';
import AttachProof from '../attachProof/AttachProof';
import Collapse from '@material-ui/core/Collapse';
import Spinner from '../Spinner';
import { ImageContext } from '../../context/ImageContext';
import axios from 'axios';

const CreateFavour = ({ setType }) => {
  const { selectedImage, setSelectedImage, uploadImage, uploadedImageUrl, setUploadedImageUrl } = useContext(ImageContext);
  const [usernameInput, setUsernameInput] = useState('@Whom?');
  const [storedFavor, setStoredFavor] = useState('What?');
  const [storedTypeTest, setStoredTypeTest] = useState('Bought');
  const [storedAction, setStoredAction] = useState('Action?');
  const [typeFieldClicked, setTypeFieldClicked] = useState('type_field_unclicked');
  const [cancelBtnClicked, setCancelBtnClicked] = useState(false);
  const [usernameSuggestions, setUsernameSuggestions] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [success, setSuccess] = useState(false);

  function handleSuccess() {
    //clear alerts
    reset();

    // Display success alert
    setLoading(false);
    setOpen(true);
    setSuccess('Favour has been created');

    // Reset Inputs
    setStoredFavor('What?');
    setStoredAction('Action?');
    setUsernameInput('@Whom?');
    setTypeFieldClicked('type_field_unclicked');
  }

  function handleClickCancel() {
    //clear alerts
    reset();

    // Display clear alert
    setOpen(true);
    setInfo('Form cleared');

    // Reset Inputs
    setStoredFavor('What?');
    setStoredAction('Action?');
    setUsernameInput('@Whom?');
    setTypeFieldClicked('type_field_unclicked');
    setCancelBtnClicked(true);
    setSelectedImage(null);
  }

  function handleOnChangeWhom(text, fromSelect = false) {
    reset();
    // Set text input as UsernameInput
    setUsernameInput(text);
    // Clear Username suggestions that i fetch from database
    setUsernameSuggestions([]);
    // Remove @ at the beginning of string
    const username = text.split('@')[1];
    // If username is not empty or null, and the function wasn't called from dropdown menu
    // Post request server to predict username
    if (username && !fromSelect) {
      axios.post('/auth/username_predict', { username }).then((response) => {
        setUsernameSuggestions(response.data);
      });
    }
    // If text is empty
    if (text === '') {
      setUsernameInput('@');
    }
  }

  async function handleCreateFavor() {
    if (storedAction === 'Action?') {
      setOpen(true);
      setError('Please select an action');
    }

    if (usernameInput === '@Whom?' || usernameInput === '@') {
      setOpen(true);
      setError('Invalid username');
    }

    if (storedFavor === 'What?') {
      setOpen(true);
      setError('Please select a favor');
    }

    if (storedAction === 'Owe') {
      //Username split the @
      const username = usernameInput.split('@')[1];
      try {
        const response = await axios.post('/auth/username_predict', { username });
        if (response.data.length > 0) {
          //Get the first object in data array
          const userDetails = response.data[0];
          // If the user id from database and user id from own/bought is the same
          if (userDetails._id === localStorage.getItem('id')) {
            setOpen(true);
            setError('Cannot create favour to yourself!');
          } else {
            setLoading(true);
            const res = await axios.post('/favors/create', {
              // Check if it's Ower or Owner
              ower: storedAction === 'Owe' ? localStorage.getItem('id') : userDetails._id,
              owner: storedAction === 'Owe' ? userDetails._id : localStorage.getItem('id'),
              favor_detail: storedFavor,
              picture_proof_id: 'null',
            });
            if (res.status === 200) {
              setLoading(false);
              handleSuccess();
              setSelectedImage(null);
              setIsCreating(false);
              setType('isLoading');
              setType('all');
              setOpen(true);
              setSuccess('Favor created successfully!');
            } else {
              setLoading(false);
              console.log('Create favor failed');
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else if (storedAction === 'Bought') {
      if (selectedImage === null) {
        setOpen(true);
        setError('Please upload an image');
      } else {
        //Username split the @
        const username = usernameInput.split('@')[1];
        try {
          const response = await axios.post('/auth/username_predict', { username });
          if (response.data.length > 0) {
            //Get the first object in data array
            const userDetails = response.data[0];
            // If the user id from database and user id from own/bought is the same
            if (userDetails._id === localStorage.getItem('id')) {
              setOpen(true);
              setError('Cannot create favour to yourself!');
            } else {
              setLoading(true);
              const resImage = await uploadImage();
              if (resImage.error) {
                setLoading(false);
                setOpen(true);
                setError('Upload failed. Invalid file type or size is too large. (Max: 2MB)');
              } else {
                const res = await axios.post('/favors/create', {
                  // Check if it's Ower or Owner
                  ower: storedAction === 'Owe' ? localStorage.getItem('id') : userDetails._id,
                  owner: storedAction === 'Owe' ? userDetails._id : localStorage.getItem('id'),
                  favor_detail: storedFavor,
                  picture_proof_id: resImage.location,
                });
                if (res.status === 200) {
                  setLoading(false);
                  handleSuccess();
                  setSelectedImage(null);
                  setIsCreating(false);
                  setType('isLoading');
                  setType('all');
                  setOpen(true);
                  setSuccess('Favor created successfully!');
                } else {
                  setLoading(false);
                  console.log('Create favor failed');
                }
              }
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  function reset() {
    setError('');
    setInfo('');
    setLoading(false);
    setIsCreating(false);
  }

  function uploadError(error) {
    setLoading(false);
    setOpen(true);
    setError(error);
  }

  //set timeout when alert is displayed
  useEffect(() => {
    if (error || success || info) {
      setCancelBtnClicked(false);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 4000);
    }
  });

  return (
    <div id='createFavour' className=''>
      <div className='createFavour_card'>
        <div className='createFavour_content'>
          <div className='createFavour_form'>
            <div className='createFavour_first_line'>
              <div className='a_text'> I </div>
              <div className='what_field'>
                <Select
                  value={storedAction}
                  className=''
                  style={{ height: 0 }}
                  onChange={(event) => setStoredAction(event.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  disableUnderline={true}
                  MenuProps={{
                    getContentAnchorEl: null,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                  }}
                >
                  <MenuItem value={'Action?'}>
                    <div className='what_menu_label'> Action? </div>
                  </MenuItem>
                  <MenuItem value='Bought'>
                    <div className='what_value_label'> Bought </div>
                  </MenuItem>
                  <MenuItem value='Owe'>
                    <div className='what_value_label'> Owe </div>
                  </MenuItem>
                </Select>
              </div>
            </div>
            <div className='createFavour_second_line'>
              <InlineText className='who_field' text={usernameInput} onTextChange={handleOnChangeWhom} usernameSuggestions={usernameSuggestions} />
            </div>
            <div className='createFavour_third_line'>
              <div className='a_text'> a </div>
              <div className='what_field'>
                <Select
                  value={storedFavor}
                  className=''
                  style={{ height: 0 }}
                  onChange={(event) => setStoredFavor(event.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  disableUnderline={true}
                  MenuProps={{
                    getContentAnchorEl: null,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'right',
                    },
                  }}
                >
                  <MenuItem value={'What?'}>
                    <div className='what_menu_label'> What? </div>
                  </MenuItem>
                  <MenuItem value='Coffee'>
                    <div className='what_value_label'> Coffee </div>
                  </MenuItem>
                  <MenuItem value='Chocolate'>
                    <div className='what_value_label'> Chocolate </div>
                  </MenuItem>
                  <MenuItem value='Pizza'>
                    <div className='what_value_label'> Pizza </div>
                  </MenuItem>
                  <MenuItem value='Cupcake'>
                    <div className='what_value_label'> Cupcake </div>
                  </MenuItem>
                  <MenuItem value='Mints'>
                    <div className='what_value_label'> Mints </div>
                  </MenuItem>
                </Select>
              </div>
            </div>
            <div className='createFavour_fourth_line'>{storedAction === 'Bought' ? <AttachProof cancelClicked={cancelBtnClicked} /> : ''}</div>
          </div>
          <div className='btn_container'>
            <button className='create_favour_btn' onClick={handleCreateFavor} disabled={isCreating}>
              <span> Create Favour </span>
            </button>
            <button className='cancel_favour_btn' onClick={handleClickCancel}>
              <CancelRoundedIcon fontSize='large'> </CancelRoundedIcon>
            </button>
          </div>
        </div>
        <div className='alert_container'>
          <div>{loading ? <Spinner /> : ''}</div>
          <Collapse in={open}>
            {error && (
              <AlertMessage severity='error'>
                <strong>{error}</strong>
              </AlertMessage>
            )}
            {success && (
              <AlertMessage severity='success'>
                <strong>Favour has been created</strong>
              </AlertMessage>
            )}
            {info && (
              <AlertMessage severity='info'>
                {' '}
                <strong>{info}</strong>{' '}
              </AlertMessage>
            )}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default CreateFavour;
