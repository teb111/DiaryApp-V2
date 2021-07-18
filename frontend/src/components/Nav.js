import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

const Nav = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    console.log("logout");
  };
  return (
    <div>
      <div className="primary-nav">
        <button href="#" className="hamburger open-panel nav-toggle">
          <span className="screen-reader-text">Menu</span>
        </button>

        <nav role="navigation" className="menu">
          <a href="#" className="logotype">
            DIARYAPP<span>-v2</span>
          </a>

          <div className="overflow-container">
            <ul className="menu-dropdown">
              <li>
                <Link to="/create" style={{ padding: "1em" }}>
                  <span>New Diary</span>
                  <span className="icon">
                    <i className="fas fa-plus"></i>
                  </span>
                </Link>
              </li>
              <li className="menu-hasdropdown">
                <a href="#">Settings</a>
                <span className="icon">
                  <i className="fas fa-cogs"></i>
                </span>

                <label title="toggle menu" htmlFor="settings">
                  <span className="downarrow">
                    <i className="fas fa-caret-down"></i>
                  </span>
                </label>
                <input
                  type="checkbox"
                  className="sub-menu-checkbox"
                  id="settings"
                />

                <ul className="sub-menu-dropdown">
                  <li>
                    <a href="">Profile</a>
                  </li>
                  <li>
                    <a href="">Security</a>
                  </li>
                  <li>
                    <a href="">Account</a>
                  </li>
                </ul>
              </li>

              <li>
                <a style={{ cursor: "pointer" }} onClick={logoutHandler}>
                  Logout
                </a>
                <span className="icon">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
