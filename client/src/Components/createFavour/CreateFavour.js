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
    setError("")
    setSuccess(isSuccess)

    setStoredValue("What");
    setStoreTypeTest('Bought')
    setUsernameInput("@Whom?")
  }

  function handleOnChangeWhom(text, fromSelect = false) {
    reset()

    setUsernameInput(text)
    setUsernameSuggestions([])

    const username = text.split('@')[1]
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

    if (storedValue !== "What") {
      if (usernameInput !== "@" || usernameInput) {

        const username = usernameInput.split('@')[1]

        axios.post(`${CONFIG.API_URL}/auth/username_predict`, { username })
          .then(response => {
            if (response.data.length > 0) {
              const userDetails = response.data[0]

              if (userDetails._id !== localStorage.getItem("id")) {
                // Make post request to create favour
                axios.post(`${CONFIG.API_URL}/favors/create`,
                  {
                    ower: setStoreTypeTest === "Owe" ? localStorage.getItem("id") : userDetails._id,
                    owner: setStoreTypeTest === "Owe" ? userDetails._id : localStorage.getItem("id"),
                    favor_detail: storedValue,
                    picture_proof_id: "5f603354c3078f0ef91532dc"
                  }
                ).then(response => {
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
