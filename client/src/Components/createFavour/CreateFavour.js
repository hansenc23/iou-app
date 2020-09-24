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

import CONFIG from '../../config';

const CreateFavour = () => {
  const { selectedImage, setSelectedImage, uploadImage, uploadedImageUrl, setUploadedImageUrl } = useContext(ImageContext);
  const [usernameInput, setUsernameInput] = useState('@Whom?');
  const [storedValue, setStoredValue] = useState('What?');
  const [storedTypeTest, setStoredTypeTest] = useState('Bought');
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
    setStoredValue('What?');
    setStoredTypeTest('Bought');
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
    setStoredValue('What?');
    setStoredTypeTest('Bought');
    setUsernameInput('@Whom?');
    setTypeFieldClicked('type_field_unclicked');
    setCancelBtnClicked(true);
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

  function handleStoreOnClick(event) {
    reset();
    event.preventDefault();
    event.target.textContent === 'Bought' ? setStoredTypeTest('Owe') : setStoredTypeTest('Bought');
    setTypeFieldClicked('type_field_clicked');
  }

  async function handleClickConfirm() {
    reset();
    // Validations
    // Check if its default value
    if (storedValue !== 'What?') {
      // Check if default value and it's null or empty
      if (usernameInput !== '@Whom?') {
        // Username split the @
        const username = usernameInput.split('@')[1];

        // Since this is the last step, we assume the username exist in database
        // because user select from drop down
        axios
          .post('/auth/username_predict', { username })
          .then((response) => {
            // Check if response is empty
            if (response.data.length > 0) {
              // Get the first object in array coz its the best match
              const userDetails = response.data[0];
              // If the user id from database and user id from own/bought is the same
              // If username from database doesnt match the one user entered
              // We dont do that
              if (userDetails._id !== localStorage.getItem('id') && userDetails.username === username) {
                setLoading(true);
                if (selectedImage === null) {
                  setLoading(false);
                  setOpen(true);
                  setError('Please select an image');
                } else {
                  uploadImage()
                    .then((data) => {
                      if (data.error) {
                        setLoading(false);
                        setOpen(true);
                        setError('Upload failed. Invalid file type or size is too large. (Max 2MB)');
                      } else {
                        axios
                          .post('/favors/create', {
                            // Check if it's Ower or Owner
                            ower: storedTypeTest === 'Owe' ? localStorage.getItem('id') : userDetails._id,
                            owner: storedTypeTest === 'Owe' ? userDetails._id : localStorage.getItem('id'),
                            favor_detail: storedValue,
                            picture_proof_id: data.location,
                          })
                          .then((response) => {
                            // Check if response is a success
                            if (response.data.success) {
                              handleSuccess();
                              setSelectedImage(null);
                              setIsCreating(false);
                            } else {
                              setError('Error: not successful');
                            }
                          })
                          .catch((e) => {
                            console.log(e);
                          });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              } else {
                setError('Invalid user');
              }
            } else {
              setError('Invalid user');
            }
          })
          .catch((e) => {
            setError('Error:', e);
          });
      } else {
        setOpen(true);
        setError('Invalid username');
      }
    } else {
      setOpen(true);
      setError('Please select a favour item');
    }
  }

  function reset() {
    setError('');
    setInfo('');
    setIsCreating(false);
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
              <div className='i_text'> I </div>
              <button className={typeFieldClicked} onClick={handleStoreOnClick}>
                {storedTypeTest}
              </button>
            </div>
            <div className='createFavour_second_line'>
              <InlineText className='who_field' text={usernameInput} onTextChange={handleOnChangeWhom} usernameSuggestions={usernameSuggestions} />
            </div>
            <div className='createFavour_third_line'>
              <div className='a_text'> a </div>
              <div className='what_field'>
                <Select
                  value={storedValue}
                  className=''
                  style={{ height: 0 }}
                  onChange={(event) => setStoredValue(event.target.value)}
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
                </Select>
              </div>
            </div>
            <div className='createFavour_fourth_line'>
              <AttachProof cancelClicked={cancelBtnClicked} />
            </div>
          </div>
          <div className='btn_container'>
            <button className='create_favour_btn' onClick={handleClickConfirm} disabled={isCreating}>
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
