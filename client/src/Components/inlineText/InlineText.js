import React, { useState, useEffect, useRef, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import "./InlineText.css";

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "black"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "black"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black"
        },
        "& .MuiOutlinedInput-input": {
            color: "black",
            fontSize: "36px",
            fontWeight: "bold",
            fontFamily: "Poppins"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "black",
            fontSize: "36px",
            fontWeight: "bold",
            fontFamily: "Poppins"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "black",
            fontSize: "36px",
            fontWeight: "bold",
            fontFamily: "Poppins"
        },
        "& .MuiInputLabel-outlined": {
            color: "black",
            fontSize: "36px",
            fontWeight: "bold",
            fontFamily: "Poppins"
        },
        "&:hover .MuiInputLabel-outlined": {
            color: "black",
            fontSize: "36px",
            fontWeight: "bold",
            fontFamily: "Poppins"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
            fontSize: "36px",
            fontWeight: "bold",
            fontFamily: "Poppins"
        }
    }
});

function InlineText({ text, onTextChange, usernameSuggestions }) {

    const classes = useStyles();

    const [isInputActive, setIsInputActive] = useState(false);

    const inputRef = useRef(null);

    // focus the cursor in the input field on edit start
    useEffect(() => {
        if (isInputActive) {
            onTextChange("@");
            inputRef.current.focus();
        }
    }, [isInputActive]);

    // Handle Input changes
    function handleInputChange(event) {
        onTextChange(event.target.value)
    }

    function handleSpanClick() {
        setIsInputActive(true)
    }

    // Handle input focus
    function handleInputOnBlur(event) {
        event.preventDefault()
        setIsInputActive(false)
    }

    // Handle select options
    function handleSelect(event) {
        event.preventDefault()
        onTextChange(`@${event.target.value}`, true)
    }

    return (
        <span className="inline-text">
            <span
                onClick={handleSpanClick}
                className={`inline-text_copy inline-text_copy--${
                    !isInputActive ? "active" : "hidden"
                    }`}>
                {text === "@" ? "@Whom?" : text}
            </span>
            <input
                id="test"
                ref={inputRef}
                style={{ minWidth: Math.ceil(text.length) }}
                value={text}
                onChange={handleInputChange}
                onBlur={handleInputOnBlur}
                className={`inline-text_input inline-text_input--${
                    isInputActive ? "active" : "hidden"
                    }`} />
            {
                usernameSuggestions.length > 0 &&
                <select onChange={handleSelect} defaultValue="">
                    <option value="" disabled>Select username</option>
                    {
                        usernameSuggestions.map((each, i) => {
                            return (
                                <option value={each.username} key={i}>
                                    {each.username}
                                </option>
                            )
                        })
                    }
                </select>
            }
        </span>
    );
}

export default InlineText;
