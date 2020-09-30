import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './SignupPage.css';
import TextField from '@material-ui/core/TextField';
import AlertMessage from '../../Components/AlertMessage';
import { AuthContext } from '../../context/AuthContext';
import CONFIG from '../../config';

const SignupPage = () => {
  const [userRegData, setUserRegData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [alertBox, setAlertBox] = useState('');
  const { isAuth, setIsAuth, user, setUser, getUser } = useContext(AuthContext);

  const { firstName, lastName, username, email, password, confirmPassword } = userRegData;

  useEffect(() => {
    if (alertBox) {
      setTimeout(() => {
        setAlertBox('');
      }, 2000);
    }
  });

  // useEffect(() => {
  //   getUser();
  // });

  // let alertBox = <AlertMessage severity='error'>Please fill in your first name</AlertMessage>;

  const onChange = (e) => {
    setUserRegData({ ...userRegData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (!firstName) {
      setAlertBox(<AlertMessage severity='error'>Please enter your first name</AlertMessage>);
      e.target.children[0].children[1].children[0].focus();
    } else if (!lastName) {
      setAlertBox(<AlertMessage severity='error'>Please enter your last name </AlertMessage>);
      e.target.children[1].children[1].children[0].focus();
    } else if (!username) {
      setAlertBox(<AlertMessage severity='error'>Please enter your username</AlertMessage>);
      e.target.children[2].children[1].children[0].focus();
    } else if (!email) {
      setAlertBox(<AlertMessage severity='error'>Please enter your email</AlertMessage>);
      e.target.children[2].children[1].children[0].focus();
    } else if (!password) {
      setAlertBox(<AlertMessage severity='error'>Please enter your password</AlertMessage>);
      e.target.children[3].children[1].children[0].focus();
    } else if (!confirmPassword) {
      setAlertBox(<AlertMessage severity='error'>Please confirm your password</AlertMessage>);
      e.target.children[4].children[1].children[0].focus();
    } else if (confirmPassword && password !== confirmPassword) {
      setAlertBox(<AlertMessage severity='error'>Password does not match!</AlertMessage>);
      e.target.children[4].children[1].children[0].focus();
    } else {
      postUserData();
    }
  };

  const postUserData = async () => {
    const userData = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.status === 400) {
        setAlertBox(<AlertMessage severity='error'>{data}</AlertMessage>);
      }

      if (res.status === 200) {
        //todo: receive cookie from server and logs in user
        localStorage.setItem('isAuth', 'true');
        setUserRegData({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        loadUser();
      }
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
    <div id='Signup'>
      <div className='signup_container'>
        <div className='signup_logo_area'>
          <div className='signup_logo_msg'>Hello there!</div>
        </div>
        <div className='signup_form_area'>
          <div className='signup_form_title'>Create Account</div>
          <form className='signup_form' autoComplete='off' id='signupForm' onSubmit={formSubmit}>
            <TextField
              id='outlined-basic'
              variant='outlined'
              label='First Name'
              size='small'
              value={firstName}
              name='firstName'
              onChange={onChange}
              InputProps={{ style: { fontSize: 18, fontWeight: 600, fontFamily: 'Poppins' } }}
            />
            <TextField
              id='outlined-basic'
              variant='outlined'
              label='Last Name'
              size='small'
              value={lastName}
              name='lastName'
              onChange={onChange}
              InputProps={{ style: { fontSize: 18, fontWeight: 600, fontFamily: 'Poppins' } }}
            />
            <TextField
              id='outlined-basic'
              variant='outlined'
              label='Username'
              size='small'
              value={username}
              name='username'
              onChange={onChange}
              InputProps={{ style: { fontSize: 18, fontWeight: 600, fontFamily: 'Poppins' } }}
            />
            <TextField
              id='outlined-basic'
              variant='outlined'
              label='Email'
              size='small'
              value={email}
              name='email'
              onChange={onChange}
              type='email'
              InputProps={{ style: { fontSize: 18, fontWeight: 600, fontFamily: 'Poppins' } }}
            />
            <TextField
              id='outlined-basic'
              variant='outlined'
              label='Password'
              size='small'
              type='password'
              value={password}
              name='password'
              onChange={onChange}
              InputProps={{ style: { fontSize: 18, fontWeight: 600, fontFamily: 'Poppins' } }}
            />
            <TextField
              id='outlined-basic'
              variant='outlined'
              label='Confirm Password'
              size='small'
              type='password'
              value={confirmPassword}
              name='confirmPassword'
              onChange={onChange}
              InputProps={{ style: { fontSize: 18, fontWeight: 600, fontFamily: 'Poppins' } }}
            />
          </form>
          {alertBox && alertBox}
          <button type='submit' form='signupForm' className='signup_btn'>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );

  return renderPage;
};

export default SignupPage;
