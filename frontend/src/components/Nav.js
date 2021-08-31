import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { createDiary } from "../actions/diaryActions";
import { Link } from "react-router-dom";

const Nav = ({ history }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    console.log("logout");
  };

  const diaryCreate = useSelector((state) => state.diaryCreate);
  const { success: successCreate, diary: createdDiary } = diaryCreate;

  useEffect(() => {
    if (successCreate) {
      history.push(`/edit/${createdDiary._id}`);
    } else {
      history.push("/");
    }
  }, [successCreate, history, createdDiary]);

  const createDiaryHandler = () => {
    dispatch(createDiary());
  };
  return (
    <div>
      <div className="primary-nav">
        <button href="#" className="hamburger open-panel nav-toggle">
          <span className="screen-reader-text">Menu</span>
        </button>

        <nav role="navigation" className="menu">
          <a href="/" className="logotype">
            DIARYAPP<span>-v2</span>
          </a>

          <div className="overflow-container">
            <ul className="menu-dropdown">
              <li
                onClick={createDiaryHandler}
                style={{ padding: "1em", cursor: "pointer" }}
              >
                <span>New Diary</span>
                <span className="icon">
                  <i className="fas fa-plus"></i>
                </span>
              </li>
              <Link to="/search" style={{ padding: "1em", cursor: "pointer" }}>
                <span>Search</span>
                <span className="icon">
                  <i className="fas fa-search"></i>
                </span>
              </Link>
              <li className="menu-hasdropdown">
                <a href="/">Settings</a>
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
                    <a>Profile</a>
                  </li>
                  <li>
                    <a>Security</a>
                  </li>
                  <li>
                    <a>Account</a>
                  </li>
                </ul>
              </li>

              <li
                style={{ padding: "1em", cursor: "pointer" }}
                onClick={logoutHandler}
              >
                {" "}
                Logout
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
