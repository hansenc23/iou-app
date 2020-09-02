import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import TextField from "@material-ui/core/TextField";

function LoginPage() {

    return (
        <div id="Login">
            <div className="login_container">
                <div className="login_form_area">
                    <div className ="login_form_title">
                        Log in
                    </div>
                    <form className="login_form"  noValidate autoComplete="off">
                        <TextField id="outlined-basic" variant="outlined" label="Email" size="small" InputProps={{ style: { fontSize: 22, fontWeight: 600, fontFamily: "Poppins" } }} />
                        <TextField id="outlined-basic" variant="outlined" label="Password" size="small" type="password" InputProps={{ style: {fontSize: 22, fontWeight: 600, fontFamily: "Poppins" } }} />
                    </form>
                    <button type="button" className ="login_btn">
                        Log In
                    </button>
                </div>
                <div className="login_logo_area">
                    <div className="login_logo_msg">
                        Welcome Back!
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
