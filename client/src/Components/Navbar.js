import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

class Navbar extends Component {

    render() {
        return (
            <div id="navbar">
                <div className="logo">
                    I Owe You
                </div>
                <div className="links">
                    <div className="linkTitle">
                        <Link to="/favours">Favours</Link>
                    </div>
                    <div className="linkTitle">
                        <Link to="/requests">Requests</Link>
                    </div>
                    <div className="linkTitle">
                        <Link to="/leaderboard">Leaderboard</Link>
                    </div>
                    <div className="linkTitle">
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;