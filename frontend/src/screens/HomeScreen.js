import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLoginGoogle = useSelector((state) => state.userLoginGoogle);
  const { userGoogle } = userLoginGoogle;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userGoogle && !userInfo) {
      history.push("/login");
    }
  }, [userGoogle, history, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
    console.log("logout");
  };

  return (
    <>
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
                <a href="#">Dashboard</a>
                <span className="icon">
                  <i className="fas fa-tachometer-alt"></i>
                </span>
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
                <a href="#">Favourites</a>
                <span className="icon">
                  <i className="fa fa-heart"></i>
                </span>
              </li>

              <li>
                <a href="#">Messages</a>
                <span className="icon">
                  <i className="fa fa-envelope"></i>
                </span>
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

      <div className="new-wrapper wrappper-background">
        <div id="main">
          <div id="main-contents">
            <div className="welcome-text">
              <h5 className="big-heading">
                Welcome{" "}
                <strong>
                  {userGoogle ? userGoogle.name : userInfo ? userInfo.name : ""}
                </strong>
              </h5>
            </div>
            <br />
            <br />
            <div className=" welcome-text diaries">
              <h5 className="small-heading">
                {" "}
                You have No Diaries Here yet <br />
                Click the icon below to get started
              </h5>
            </div>

            <div className="welcome-text">
              <Link to="">
                <i style={{ color: "white" }} class="fas fa-plus-circle"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
