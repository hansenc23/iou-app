import React, { useState, useEffect, useContext } from 'react';
import './LoginPage.css';
import TextField from '@material-ui/core/TextField';
import AlertMessage from '../../Components/AlertMessage';
import { AuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom';

function LoginPage() {
  //login form data
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  //destructured login data
  const { email, password } = loginInfo;

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
    if (!email) {
      setAlertBox(<AlertMessage severity='error'>Please enter your email</AlertMessage>);
    } else if (!password) {
      setAlertBox(<AlertMessage severity='error'>Please enter your password</AlertMessage>);
    } else {
      postLoginData();
    }
  };

  const postLoginData = async () => {
    const loginData = {
      email,
      password,
    };

    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      //if request is successfull
      if (res.status === 200) {
        localStorage.setItem('isAuth', 'true');
        setLoginInfo({
          email: '',
          password: '',
        });
        loadUser();
      }

      if (res.status === 400) {
        setAlertBox(<AlertMessage severity='error'>{data}</AlertMessage>);
      }

      console.log(data);
    } catch (err) {
      console.log(err);
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
    <div id='Login'>
      <div className='login_container'>
        <div className='login_form_area'>
          <div className='login_form_title'>Log in</div>
          <form className='login_form' autoComplete='off' id='loginForm' onSubmit={formSubmit}>
            <TextField
              id='outlined-basic'
              variant='outlined'
              label='Email'
              size='small'
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              InputProps={{ style: { fontSize: 22, fontWeight: 600, fontFamily: 'Poppins' } }}
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
              InputProps={{ style: { fontSize: 22, fontWeight: 600, fontFamily: 'Poppins' } }}
            />
          </form>
          {alertBox && alertBox}
          <button type='submit' form='loginForm' className='login_btn'>
            Log In
          </button>
        </div>
        <div className='login_logo_area'>
          <div className='login_logo_msg'>Welcome Back!</div>
        </div>
      </div>
    </div>
  );

  return renderPage;
}

export default LoginPage;