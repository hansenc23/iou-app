import React, { useState } from "react";
import "./FavoursList.css";
import Favour from "../favour/Favour";

const FavoursList = ({ type, setType }) => {
  function handleOnClick(event) {
    event.preventDefault();
    setType(event.target.value);
  }

  return (
    <div>
      <div id="favours_list" className="">
        <div className="favours_title"> Favours</div>
        <span className="filter_btn">
          <button
            type="button"
            className="all_favours_btn"
            value="all"
            onClick={handleOnClick}
          >
            All
          </button>
          <button
            type="button"
            className="owe_btn"
            value="owe"
            onClick={handleOnClick}
          >
            Owe
          </button>
          <button
            type="button"
            className="owing_btn"
            value="owing"
            onClick={handleOnClick}
          >
            Owing
          </button>
          <button
            type="button"
            className="settled_btn"
            value="settled"
            onClick={handleOnClick}
          >
            Settled
          </button>
        </span>
        <Favour type={type} setType={setType} />
      </div>
    </div>
  );
};

export default FavoursList;
