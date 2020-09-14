import React, { useState, useEffect, useContext } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './navbar/Navbar';
import RequestsPage from './pages/requestsPage/RequestsPage';
import Favours from './pages/favoursPage/FavoursPage';
import LeaderboardPage from './pages/leaderboardPage/LeaderboardPage';
import Login from './pages/loginPage/LoginPage';
import Signup from './pages/signupPage/SignupPage';
import { AuthProvider } from './context/AuthContext';
import { AuthContext } from './context/AuthContext';

import './styles/App.css';

const App = () => {
  return (
    <div className='main'>
      <div className='App'>
        <AuthProvider>
          <Router basename='/'>
            <Navbar />
            <Switch>
              <Route path='/requests' component={RequestsPage} />
              <Route path='/favours' component={Favours} />
              <Route path='/leaderboard' component={LeaderboardPage} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
              <Route path='/' component={RequestsPage} />
            </Switch>
          </Router>
        </AuthProvider>
      </div>
    </div>
  );
};

export default App;
