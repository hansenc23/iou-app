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

function PublicRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}

            render={(props) =>
                authenticated === true ? (
                    <Redirect to="/favours" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}

class App extends Component {

    constructor() {
        super();
        this.state = {
            authenticated: false,
            loading: true,
        };
    }

    componentDidMount() {
        this.setState({
            authenticated: false,
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
                            <PublicRoute
                                path="/requests"
                                component={RequestsPage}
                            />
                            <PublicRoute
                                path="/favours"
                                component={Favours}
                            />
                            <PublicRoute
                                path="/leaderboard"
                                component={LeaderboardPage}
                            />
                            <PublicRoute
                                path="/login"
                                component={Login}
                            />
                            <PublicRoute
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
