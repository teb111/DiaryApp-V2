import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    console.log("logout");
  };
  return (
    <header className="top-header">
      <button className="logout-btn" onClick={logoutHandler}>
        Logout
      </button>
      <h1>Personal Diary</h1>
      <button className="add-icon">
        <i className="fas fa-plus"></i>
      </button>
    </header>
  );
};

export default Header;
