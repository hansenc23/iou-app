import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Login from "../pages/loginPage/LoginPage";

class Navbar extends Component {

    render() {
        return (
            <div id="navbar">
                <div className="page_links">
                    <nav role="navigation">
                        <div id="menuToggle">
                            <input type="checkbox" className=""/>
                                <span></span>
                                <span></span>
                                <span></span>
                            <ul id="menu">
                                <div className="page_links">
                                    <Link to="/requests">Requests</Link>
                                </div>
                                <div className="page_links">
                                    <Link to="/favours">Favours</Link>
                                </div>
                                <div className="page_links">
                                    <Link to="/leaderboard">Leaderboard</Link>
                                </div>
                            </ul>
                        </div>
                    </nav>
                </div>

                <div className="logo">
                    IOWEYOU
                </div>

                <div className="authentication_links">
                    <div className="login_link">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="signup_link">
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