import React from 'react';
import "./FavoursList.css";
import Favour from '../favour/Favour'

const FavoursList =() => {

    return (
        <div>
            <div id="favours_list" className="">
                <div className="favours_title"> Favours</div>
                <span className="filter_btn">
                    <button type="button" className="all_btn">All</button>
                    <button type="button" className="owe_btn"> Owe </button>
                    <button type="button" className="owing_btn"> Owing </button>
                    <button type="button" className="settled_btn"> Settled </button>
                </span>
                <Favour/>
            </div>
        </div>
    )
};

export default FavoursList;
