import React, { useState, useEffect, useContext, Fragment } from 'react';
import './LoginPage.css';
import TextField from '@material-ui/core/TextField';
import AlertMessage from '../../Components/AlertMessage';
import Spinner from '../../Components/Spinner';
import { AuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom';

import CONFIG from '../../config';

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  //login form data
  const [loginInfo, setLoginInfo] = useState({
    emailOrUsername: '',
    password: '',
  });

  //destructured login data
  const { emailOrUsername, password } = loginInfo;

  //alert state
  const [alertBox, setAlertBox] = useState('');

  //authentication info
  const { isAuth, setIsAuth, user, setUser, getUser } = useContext(AuthContext);

  //set timeout when alert is displayed
  useEffect(() => {
    if (alertBox) {
      setTimeout(() => {
        setAlertBox('');
      }, 2000);
    }
  });

  const onChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  //submit form action
  const formSubmit = (e) => {
    e.preventDefault();

    // check if email and password is empty
    if (!emailOrUsername) {
      setAlertBox(<AlertMessage severity='error'>Please enter your email or username</AlertMessage>);
    } else if (!password) {
      setAlertBox(<AlertMessage severity='error'>Please enter your password</AlertMessage>);
    } else {
      postLoginData();
    }
  };

  const postLoginData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginInfo),
      });

      const data = await res.json();

      //if request is successfull
      if (res.status === 200) {
        setIsLoading(false);
        localStorage.setItem('isAuth', 'true');
        setLoginInfo({
          emailOrUsername: '',
          password: '',
        });
        loadUser();
      }

      if (res.status === 400) {
        setIsLoading(false);
        setAlertBox(<AlertMessage severity='error'>{data}</AlertMessage>);
      }

      console.log(data);
    } catch (err) {
      alert(err);
    }
  };

  const loadUser = async () => {
    if (localStorage.getItem('isAuth') === 'true') {
      getUser();
    }
  };

  const renderPage = isAuth ? (
    <Redirect to='/requests' />
  ) : (
    <Fragment>
      <div id='Login'>
        <div className='login_form'>
          <div className='login_form_title'>Welcome Back,</div>
          <form className='login_textfields' autoComplete='off' id='loginForm' onSubmit={formSubmit}>
            <TextField
              id='outlined-basic'
              variant='outlined'
              label='Email or Username'
              size='small'
              name='emailOrUsername'
              value={emailOrUsername}
              onChange={onChange}
              InputProps={{ style: { fontSize: 15, fontWeight: 600, fontFamily: 'Poppins' } }}
            />
            <TextField
              id='outlined-basic'
              variant='outlined'
              label='Password'
              size='small'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              InputProps={{ style: { fontSize: 15, fontWeight: 600, fontFamily: 'Poppins' } }}
            />
          </form>

          <div className='login_alert'>
            {alertBox && alertBox}
            {isLoading ? <Spinner width='50px' /> : ''}
          </div>
          <button type='submit' form='loginForm' className='login_btn'>
            Log In
          </button>
        </div>
      </div>
    </Fragment>
  );

  return renderPage;
}

export default LoginPage;
