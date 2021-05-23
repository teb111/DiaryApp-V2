import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle } from "../actions/userActions";

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();

  const logInWithGoogle = (e) => {
    e.preventDefault();
    dispatch(loginWithGoogle());
  };
  return (
    <>
      <div className="signup-container">
        <div className="account-left">
          <div className="account-text">
            <h1 className="login-text">
              Personal Diary &nbsp; <i className="fas fa-book-open"></i>
            </h1>
            <p className="login-text-primary">Keep Your Deepest Secrets Here</p>
          </div>
        </div>

        <div className="account-right">
          <div className="form-area">
            <form>
              <div className="group">
                <h2 className="form-heading">Please Log in</h2>
              </div>
              <div className="group">
                <input
                  type="email"
                  name="email"
                  className="control"
                  placeholder="Enter email address....."
                />
                <div className="name-error error"></div>
              </div>
              <div className="group">
                <input
                  type="password"
                  name="password"
                  className="control"
                  placeholder="Enter password....."
                />
                <div className="name-error error"></div>
              </div>

              <div className="group">
                <input
                  type="submit"
                  name="login"
                  className="btn account-btn"
                  readOnly
                  value="Log in"
                />
              </div>

              <div className="group">
                <input
                  type="submit"
                  name="login"
                  className="btn account-btn"
                  readOnly
                  value="Continue With Google"
                  onClick={logInWithGoogle}
                />{" "}
              </div>

              <div className="group">
                <Link
                  to="/signup"
                  className="btn"
                  style={{ textDecoration: "none" }}
                >
                  <h4 className="link">Create new account ??? 😚</h4>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
