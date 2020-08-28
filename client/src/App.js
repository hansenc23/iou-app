import React, {Component} from 'react';

import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

//import TestApi from './TestApi';

import Navbar from "./Components/Navbar";
import Requests from "./Components/Pages/Requests";
import Favours from "./Components/Pages/Favours";
import Leaderboard from "./Components/Pages/Leaderboard";
import Login from "./Components/Pages/Login";

import './App.css';

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
                                path="/favours"
                                component={Favours}
                            />
                            <PublicRoute
                                path="/requests"
                                component={Requests}
                            />
                            <PublicRoute
                                path="/leaderboard"
                                component={Leaderboard}
                            />
                            <PublicRoute
                                path="/leaderboard"
                                component={Login}
                            />
                        </Switch>
                    </Router>
                </div>
            </div>
        )
    }
}

export default App;
