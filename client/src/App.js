import React, { useState, useEffect, useContext } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './navbar/Navbar';
import RequestsPage from './pages/requestsPage/RequestsPage';
import Favours from './pages/favoursPage/FavoursPage';
import LeaderboardPage from './pages/leaderboardPage/LeaderboardPage';
import Login from './pages/loginPage/LoginPage';
import Signup from './pages/signupPage/SignupPage';
import Party from './pages/partyPage/PartyPage'

import { AuthProvider } from './context/AuthContext';
import { ImageProvider } from './context/ImageContext';
import { AuthContext } from './context/AuthContext';

import './styles/App.css';

const App = () => {
  return (
    <div className='main'>
      <div className='App'>
        <AuthProvider>
          <ImageProvider>
            <Router basename='/'>
              <Navbar />
              <Switch>
                <Route path='/requests' component={RequestsPage} />
                <Route path='/favours' component={Favours} />
                <Route path='/leaderboard' component={LeaderboardPage} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                <Route path='/party' component={Party} />
                <Route path='/' component={RequestsPage} />
              </Switch>
            </Router>
          </ImageProvider>
        </AuthProvider>
      </div>
    </div>
  );
};

export default App;
