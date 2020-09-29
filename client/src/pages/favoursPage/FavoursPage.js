import React, { useState, useEffect, useContext, useReducer } from "react";
import "./FavoursPage.css";
import FavoursList from "../../Components/favoursList/FavoursList";
import CreateFavour from "../../Components/createFavour/CreateFavour";
import { AuthContext } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";

function FavoursPage() {
  const { isAuth, setIsAuth, user, setUser, getUser } = useContext(AuthContext);
  const [type, setType] = useState("all");

  useEffect(() => {
    getUser();
  }, []);

  const renderPage = isAuth ? (
    <>
      <FavoursList type={type} setType={setType} />
      <CreateFavour setType={setType}/>
    </>
  ) : (
    <Redirect to="/login"></Redirect>
  );

  return (
    <div id="FavoursPage" className="">
      {renderPage}
    </div>
  );
}

export default FavoursPage;
