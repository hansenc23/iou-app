import React, {useState, useEffect, Component} from 'react';
import "./FavoursPage.css";
import FavoursList from "../../components/favoursList/FavoursList";
import CreateFavour from "../../components/createFavour/CreateFavour";

function FavoursPage () {

    const [] = useState(0);

    useEffect(() => {});

    return (
        <div id="Favours" className="">
            <FavoursList/>
            <CreateFavour/>
        </div>
    );
}

export default FavoursPage;