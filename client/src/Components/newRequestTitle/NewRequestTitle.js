import React, { useState, useEffect, useRef, useCallback } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import useKeypress from "../../hooks/useKeypress";
import DOMPurify from "dompurify";
import "./NewRequestTitle.css";

function NewRequestTitle(props) {
    const [isInputActive, setIsInputActive] = useState(false);
    const [inputValue, setInputValue] = useState(props.text);

    const wrapperRef = useRef(null);
    const textRef = useRef(null);
    const inputRef = useRef(null);

    const enter = useKeypress("Enter");
    const esc = useKeypress("Escape");

    const { onSetText } = props;

    // check to see if the user clicked outside of this component
    useOnClickOutside(wrapperRef, () => {
        if (isInputActive) {
            if (inputValue === ""){
                onSetText("New Request Title Here");
            }
            else {
                onSetText(inputValue);
            }
            setIsInputActive(false);
        }
    });

    const onEnter = useCallback(() => {
        if (enter) {
            if (inputValue === "") {
                onSetText("New Request Title Here");
            }
            else {
                onSetText(inputValue);
            }
            setIsInputActive(false);
        }
    }, [enter, inputValue, onSetText]);

    const onEsc = useCallback(() => {
        if (esc) {
            setInputValue("New Request Title Here");
            setIsInputActive(false);
        }
    }, [esc, props.text]);

    // focus the cursor in the input field on edit start
    useEffect(() => {
        if (isInputActive) {
            if ((inputValue === "New Request Title Here") || (inputValue === "")) {
                setInputValue("");
            }
            else {
                setInputValue(inputValue);
            }
            inputRef.current.focus();
        }
    }, [isInputActive]);

    useEffect(() => {
        if (isInputActive) {
            // if Enter is pressed, save the text and close
            onEnter();
            // if Escape is pressed, revert the text and close
            onEsc();
        }
    }, [onEnter, onEsc, isInputActive]); // watch the Enter and Escape key presses

    const handleInputChange = useCallback(
        event => {
            // sanitize the input
            setInputValue(DOMPurify.sanitize(event.target.value));
        },
        [setInputValue]
    );

    const handleSpanClick = useCallback(() => setIsInputActive(true), [
        setIsInputActive
    ]);

    return (
        <span className="request_title_text" ref={wrapperRef}>
        <span
            ref={textRef}
            onClick={handleSpanClick}
            className={`request_title_text_copy request_title_text_copy--${
                !isInputActive ? "active" : "hidden"
            }`}>
            {props.text}
        </span>
              <input
                  id="test"
                  ref={inputRef}
                  style={{ minWidth: Math.ceil(inputValue.length) }}
                  value={inputValue}
                  onChange={handleInputChange}
                  className={`request_title_text_input request_title_text_input--${
                      isInputActive ? "active" : "hidden"
                  }`}/>
         </span>
    );
}

export default NewRequestTitle;