import React, {Component} from 'react';

import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Requests from "./components/pages/requests/Requests";
import Favours from "./components/pages/favours/Favours";
import Leaderboard from "./components/pages/leaderboard/Leaderboard";
import Login from "./components/pages/login/Login";
import Signup from "./components/pages/Signup/Signup";

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
                                component={Requests}
                            />
                            <PublicRoute
                                path="/favours"
                                component={Favours}
                            />
                            <PublicRoute
                                path="/leaderboard"
                                component={Leaderboard}
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
