import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match, Please confirm and ReType");
    }
    e.preventDefault();
    console.log({
      name,
      email,
      password,
      confirmPassword,
    });
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
              style={{ width: "85%" }}
            >
              <i className="fas fa-arrow-circle-left"></i> Go Back
            </Link>

            <form onSubmit={submitHandler}>
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
                  className="control"
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
                <input
                  type="submit"
                  className="btn account-btn"
                  readOnly
                  value="Sign Up"
                />
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

export default SignupScreen;
