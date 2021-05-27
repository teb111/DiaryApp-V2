import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { registerUser } from "../actions/userActions";

const SignupScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userLoginGoogle = useSelector((state) => state.userLoginGoogle);
  const { userGoogle } = userLoginGoogle;
  const userRegister = useSelector((state) => state.userRegister);
  const { success } = userRegister;

  useEffect(() => {
    if (userGoogle) {
      history.push("/");
    }
    if (success) {
      history.push("/login");
    }
  }, [userGoogle, history, success]);

  const signUpHandler = (e) => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match, Please confirm and ReType");
    }
    e.preventDefault();
    dispatch(registerUser(name, email, password));
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
            <Link
              to="/login"
              className="btn account-btn"
              style={{ width: "85%", color: "white" }}
            >
              <i className="fas fa-arrow-circle-left"></i> Go Back
            </Link>

            <form>
              <div className="group">
                <h2 className="form-heading" style={{ marginTop: "10px" }}>
                  Please Sign Up
                  <i className="fas fa-user-plus"></i>
                </h2>
              </div>

              <div className="group">
                <input
                  type="name"
                  value={name}
                  className="control background"
                  placeholder="Enter Your Name...."
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="group">
                <input
                  type="email"
                  value={email}
                  className="control"
                  placeholder="Enter email address....."
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="group">
                <input
                  type="password"
                  value={password}
                  className="control"
                  placeholder="Enter password....."
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="group">
                <input
                  type="password"
                  value={confirmPassword}
                  className="control"
                  placeholder="Enter Confirm password....."
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="group">
                {message && <Message variant="danger">{message}</Message>}
              </div>

              <div className="group">
                <div
                  className="btn account-btn"
                  style={{ width: "85%", color: "white" }}
                  onClick={signUpHandler}
                >
                  Sign Up <i className="fas fa-arrow-circle-right"></i>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupScreen;
