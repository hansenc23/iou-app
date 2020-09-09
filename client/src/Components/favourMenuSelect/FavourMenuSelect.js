import React, {useState} from 'react';
import "./FavourMenuSelect.css"

const FavourMenuSelect = () => {

    return (
        <div>
            <form id="app-cover">
                <div id="select-box">
                    <input type="checkbox" id="options-view-button">
                        <div id="select-button" className="brd">
                            <div id="selected-value">
                                <span>Select a platform</span>
                            </div>
                            <div id="chevrons">

                            </div>
                        </div>
                        <div id="options">
                            <div className="option">
                                <input className="s-c top" type="radio" name="platform" value="codepen">
                                    <input className="s-c bottom" type="radio" name="platform" value="codepen">
                                        <span className="label">CodePen</span>
                                        <span className="opt-val">CodePen</span>
                                    </input>
                                </input>
                            </div>
                            <div className="option">
                                <input className="s-c top" type="radio" name="platform" value="dribbble">
                                    <input className="s-c bottom" type="radio" name="platform" value="dribbble">
                                        <span className="label">Dribbble</span>
                                        <span className="opt-val">Dribbble</span>
                                    </input>
                                </input>
                            </div>
                            <div className="option">
                                <input className="s-c top" type="radio" name="platform" value="behance">
                                    <input className="s-c bottom" type="radio" name="platform" value="behance">
                                        <span className="label">Behance</span>
                                        <span className="opt-val">Behance</span>
                                    </input>
                                </input>
                            </div>
                            <div className="option">
                                <input className="s-c top" type="radio" name="platform" value="hackerrank">
                                    <input className="s-c bottom" type="radio" name="platform" value="hackerrank">
                                        <span className="label">HackerRank</span>
                                        <span className="opt-val">HackerRank</span>
                                    </input>
                                </input>
                            </div>
                            <div className="option">
                                <input className="s-c top" type="radio" name="platform" value="stackoverflow">
                                    <input className="s-c bottom" type="radio" name="platform" value="stackoverflow">
                                        <span className="label">StackOverflow</span>
                                        <span className="opt-val">StackOverflow</span>
                                    </input>
                                </input>
                            </div>
                            <div className="option">
                                <input className="s-c top" type="radio" name="platform" value="freecodecamp">
                                    <input className="s-c bottom" type="radio" name="platform" value="freecodecamp">
                                        <span className="label">FreeCodeCamp</span>
                                        <span className="opt-val">FreeCodeCamp</span>
                                    </input>
                                </input>
                            </div>
                            <div id="option-bg"></div>
                        </div>
                    </input>
                </div>
            </form>
        </div>
    )
}

export default FavourMenuSelect;