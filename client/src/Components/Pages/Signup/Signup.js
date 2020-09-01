import React, { useState, useEffect } from "react";
import "./Signup.css";
import TextField from '@material-ui/core/TextField';

function Signup() {

    return (
        <div id="Signup">
            <div className="signup_container">
                <div className="signup_logo_area">
                    <div className="signup_logo_msg">
                        Hello There!
                    </div>
                </div>
                <div className="signup_form_area">
                    <div className ="signup_form_title">
                        Create Account
                    </div>
                    <form className="signup_form"  noValidate autoComplete="off">
                        <TextField id="outlined-basic" variant="outlined" label="Full Name" size="small" InputProps={{ style: { fontSize: 18, fontWeight: 600, fontFamily: "Poppins" } }} />
                        <TextField id="outlined-basic" variant="outlined" label="Email" size="small" InputProps={{ style: { fontSize: 18, fontWeight: 600, fontFamily: "Poppins" } }} />
                        <TextField id="outlined-basic" variant="outlined" label="Password" size="small" type="password" InputProps={{ style: {fontSize: 18, fontWeight: 600, fontFamily: "Poppins" } }} />
                        <TextField id="outlined-basic" variant="outlined" label="Confirm Password" size="small" type="password" InputProps={{ style: { fontSize: 18, fontWeight: 600, fontFamily: "Poppins"} }} />
                    </form>
                    <button type="button" className ="signup_btn">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
