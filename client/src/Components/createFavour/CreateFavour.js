import React, { useState } from 'react';
import './CreateFavour.css';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import InlineText from '../inlineText/InlineText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AlertMessage from '../AlertMessage'
import axios from 'axios'

import CONFIG from '../../config'

const CreateFavour = () => {
  const [usernameInput, setUsernameInput] = useState("@Whom?")
  const [storedValue, setStoredValue] = useState("What");
  const [storeTypeTest, setStoreTypeTest] = useState('Bought')
  const [usernameSuggestions, setUsernameSuggestions] = useState([])

  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  function handleClickCancel(isSuccess = false) {
    // Reset all errors
    // If isSuccess is true
    setError("")
    setSuccess(isSuccess)
    // Reset Inputs
    setStoredValue("What");
    setStoreTypeTest('Bought')
    setUsernameInput("@Whom?")
  }

  function handleOnChangeWhom(text, fromSelect = false) {
    reset()
    // Set text input as UsernameInput
    setUsernameInput(text)
    // Clear Username suggestions that i fetch from database
    setUsernameSuggestions([])
    // Remove @ at the begining of string
    const username = text.split('@')[1]
    // If username is not empty or null, and the function wasn't called from dropdown menu
    // Post request server to predict username
    if (username && !fromSelect) {
      axios.post(`${CONFIG.API_URL}/auth/username_predict`, { username })
        .then(response => {
          setUsernameSuggestions(response.data)
        })
    }

  }

  function handleStoreOnClick(event) {
    reset()

    event.preventDefault()
    event.target.textContent === "Bought" ? setStoreTypeTest('Owe') : setStoreTypeTest('Bought')
  }

  function handleClickConfirm() {
    reset()
    // Validations
    // Check if its default value
    if (storedValue !== "What") {
      // Check if default value and it's null or empty
      if (usernameInput !== "@" || usernameInput) {
        // Username split the @
        const username = usernameInput.split('@')[1]

        // Since this is the last step, we assume the username exist in database
        // because user select from drop down
        axios.post(`${CONFIG.API_URL}/auth/username_predict`, { username }).then(response => {
          // Check if response is empty
          if (response.data.length > 0) {
            // Get the first object in array coz its the best match
            const userDetails = response.data[0]
            // If the user id from database and user id from own/bought is the same
            // If username from database doesnt match the one user entered
            // We dont do that
            if (userDetails._id !== localStorage.getItem("id") && userDetails.username === username) {
              // Make post request to create favour
              axios.post(`${CONFIG.API_URL}/favors/create`,
                {
                  // Check if it's Ower or Owner
                  ower: storeTypeTest === "Owe" ? localStorage.getItem("id") : userDetails._id,
                  owner: storeTypeTest === "Owe" ? userDetails._id : localStorage.getItem("id"),
                  favor_detail: storedValue,
                  // PhotoID to be implement later
                  picture_proof_id: "5f603354c3078f0ef91532dc"
                }
              ).then(response => {
                // Check if response is a success
                if (response.data.success) {
                  handleClickCancel(true)
                } else {
                  setError("Error not successful");
                }
              }).catch(e => {
                setError("Error", e);
              })
            } else {
              setError("Error same user")
            }

          } else {
            setError("Error no such user")
          }
        }).catch(e => {
          setError("Error", e);
        })
      } else {
        setError("Error no username input")
      }
    } else {
      setError("Error: no item selected")
    }



  }

  function reset() {
    setError("")
    setSuccess(false)
  }

  return (
    <div id='createFavour' className=''>
      <div className='createFavour_card'>
        <div className='createFavour_content'>
          {error && <AlertMessage severity="error">{error}</AlertMessage>}
          {success && <AlertMessage severity="success">Successfully Create New Favour</AlertMessage>}

          <div className='createFavour_label'> </div>
          <div className='createFavour_form'>
            <div className='createFavour_first_line'>
              <div className='lets_text'>I</div>
              <button className='type_field' onClick={handleStoreOnClick}>
                {storeTypeTest}
              </button>
            </div>
            <div className='createFavour_second_line'>
              <div className='at_text'> </div>
              <InlineText className='who_field'
                text={usernameInput}
                onTextChange={handleOnChangeWhom}
                usernameSuggestions={usernameSuggestions}
              />
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
                  <MenuItem value={"What"}>
                    <div className='menu_label'> What? </div>
                  </MenuItem>
                  <MenuItem value="Coffee">
                    <div className='value_label'> Coffee </div>
                  </MenuItem>
                  <MenuItem value="Chocolate">
                    <div className='value_label'> Chocolate </div>
                  </MenuItem>
                  <MenuItem value="Pizza">
                    <div className='value_label'> Pizza </div>
                  </MenuItem>
                  <MenuItem value="Cupcake">
                    <div className='value_label'> Cupcake </div>
                  </MenuItem>
                </Select>
              </div>
            </div>
          </div>
          <div className='btn_container'>
            <button className='confirm_favour_btn' onClick={handleClickConfirm}>
              <span>Confirm</span>
            </button>
            <button className='cancel_favour_btn' onClick={handleClickCancel}>
              <CancelRoundedIcon fontSize='large'> </CancelRoundedIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFavour;
