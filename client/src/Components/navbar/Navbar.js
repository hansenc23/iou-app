import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {

    render() {
        return (
            <div id="navbar">
                <div className="page_links">
                    <div className="linkTitle">
                        <Link to="/requests">Requests</Link>
                    </div>
                    <div className="linkTitle">
                        <Link to="/favours">Favours</Link>
                    </div>
                    <div className="linkTitle">
                        <Link to="/leaderboard">Leaderboard</Link>
                    </div>
                </div>
                <div className="logo">
                    IOWEYOU
                </div>
                <div className="userAccount_links">
                    <div className="linkTitle">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="signup">
                        <button type="button" className="signup_btn"> Sign Up </button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Navbar;