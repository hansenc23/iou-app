import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Login from "../pages/login/Login";

class Navbar extends Component {

    render() {
        return (
            <div id="navbar">
                <div className="page_links">
                    <div className="links_label">
                        <Link to="/requests">Requests</Link>
                    </div>
                    <div className="links_label">
                        <Link to="/favours">Favours</Link>
                    </div>
                    <div className="links_label">
                        <Link to="/leaderboard">Leaderboard</Link>
                    </div>
                </div>

                <div className="logo">
                    IOWEYOU
                </div>

                <div className="authentication_links">
                    <div className="links_label">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="links_label">
                        <button className= "signup_link_label">
                            <Link to="/signup">Sign Up</Link>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;