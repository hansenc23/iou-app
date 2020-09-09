import React, {Component} from 'react';

import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Navbar from "./navbar/Navbar";
import RequestsPage from "./pages/requestsPage/RequestsPage";
import Favours from "./pages/favoursPage/FavoursPage";
import LeaderboardPage from "./pages/leaderboardPage/LeaderboardPage";
import Login from "./pages/loginPage/LoginPage";
import Signup from "./pages/signupPage/SignupPage";

import './styles/App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        this.setState({
            loading: false,
        });
    }

    render() {
        return this.state.loading === true ? (
            <div
                className="spinner-border text-success"
                role="status"
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                }}
            >
                <span className="sr-only">Loading...</span>
            </div>
        ) : (
            <div className="main">
                <div className='App'>
                    <Router basename="/">
                        <Navbar/>
                        <Switch>
                            <Route
                                path="/requests"
                                component={RequestsPage}
                            />
                            <Route
                                path="/favours"
                                component={Favours}
                            />
                            <Route
                                path="/leaderboard"
                                component={LeaderboardPage}
                            />
                            <Route
                                path="/login"
                                component={Login}
                            />
                            <Route
                                path="/signup"
                                component={Signup}
                            />
                        </Switch>
                    </Router>
                </div>
            </div>
        )
    }
}

export default App;
