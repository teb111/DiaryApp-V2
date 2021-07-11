import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { loginUser } from "../actions/userActions";

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const responseSuccessGoogle = (response) => {
    const tokenId = response.tokenId;
    dispatch(loginWithGoogle(tokenId));
  };

  const userRegister = useSelector((state) => state.userRegister);
  const { success } = userRegister;

  const responseErrorGoogle = (response) => {
    console.log(response);
  };

  const userLoginGoogle = useSelector((state) => state.userLoginGoogle);
  const { loading, userGoogle } = userLoginGoogle;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  useEffect(() => {
    if (userGoogle || userInfo) {
      history.push("/");
    }
  }, [userGoogle, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
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
            <form onSubmit={submitHandler}>
              <div className="group" style={{ marginTop: "10px" }}>
                <h2 className="form-heading">Please Log in</h2>
              </div>
              <div className="group">
                <input
                  type="email"
                  value={email}
                  className="control"
                  placeholder="Enter email address....."
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="name-error error"></div>
              </div>
              <div className="group">
                <input
                  type="password"
                  value={password}
                  className="control"
                  placeholder="Enter password....."
                  onChange={(e) => setPassword(e.target.value)}
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

              <div
                style={{
                  marginBottom: "3px",
                }}
                className="group"
              >
                <p
                  style={{
                    fontSize: "12px",
                    display: "block",
                  }}
                >
                  Having Issues Logging In ???
                </p>{" "}
              </div>
              <div
                style={{
                  marginBottom: "2px",
                }}
                className="group"
              >
                <Link
                  to="/forgot-password"
                  className="btn"
                  style={{ textDecoration: "none" }}
                >
                  <h4
                    style={{
                      fontSize: "14px",
                    }}
                    className="link"
                  >
                    Forgot Password???
                  </h4>
                </Link>
              </div>

              <div className="group">
                {error && (
                  <Message textcolor="#FF0000" iconClass="fas fa-ban">
                    {error}
                  </Message>
                )}
              </div>

              <div
                className="group"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "3px",
                  marginTop: "2px",
                }}
              >
                {loading ? (
                  <Loader />
                ) : (
                  <GoogleLogin
                    clientId="247079180053-gjglmnlaevngo30bgmibj4olgdhv22qm.apps.googleusercontent.com"
                    buttonText="Continue with Google"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                )}
              </div>

              <div className="group">
                {success && (
                  <Message textcolor="green" iconClass="fas fa-check">
                    Account Created Successfully, Please Log In
                  </Message>
                )}
              </div>

              <div className="group">
                <Link
                  to="/signup"
                  className="btn"
                  style={{ textDecoration: "none" }}
                >
                  <h4 className="link">Create new account ???</h4>
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
