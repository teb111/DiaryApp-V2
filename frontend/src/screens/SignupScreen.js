import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { registerUser } from "../actions/userActions";
import Meta from "../components/Meta";

const SignupScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userLoginGoogle = useSelector((state) => state.userLoginGoogle);
  const { userGoogle } = userLoginGoogle;
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, success } = userRegister;

  useEffect(() => {
    if (userGoogle) {
      history.push("/");
    }
    if (success) {
      history.push("/login");
    }
  }, [userGoogle, history, success]);

  //image uploading
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploads", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match, Please confirm and ReType");
    } else {
      dispatch(registerUser({ name, email, password, image }));
      console.log(name, email, password, image);
    }
  };

  return (
    <>
      <Meta title="Create your Profile" />
      <div className="signup-container">
        <div className="account-left">
          <div className="account-text">
            <h1 className="login-text">
              Personal Diary &nbsp;{" "}
              <i
                className="fas fa-book-open header-icon"
                style={{ borderColor: "#ccc" }}
              ></i>
            </h1>
            <p className="login-text-primary">Keep Your Deepest Secrets Here</p>
          </div>
        </div>

        <div className="account-right">
          <div className="form-area">
            <Link
              to="/login"
              className="btn account-btn"
              style={{ width: "85%", marginBottom: "5px", marginTop: "3px" }}
            >
              <i className="fas fa-arrow-circle-left"></i> Go Back
            </Link>

            <form>
              <div className="group-margin">
                <h2
                  className="form-heading"
                  style={{ marginTop: "10px", textAlign: "center" }}
                >
                  Please Sign Up
                  <i className="fas fa-user-plus"></i>
                </h2>
              </div>

              <div className="group-margin">
                <input
                  type="name"
                  value={name}
                  className="control background"
                  placeholder="Enter Your Name...."
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="group-margin">
                <input
                  type="email"
                  value={email}
                  className="control"
                  placeholder="Enter email address....."
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="group-margin">
                <input
                  type="password"
                  value={password}
                  className="control"
                  placeholder="Enter password....."
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="group-margin">
                <input
                  type="password"
                  value={confirmPassword}
                  className="control"
                  placeholder="Enter Confirm password....."
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div
                className="group-margin"
                style={{ display: "block", width: "100%" }}
              >
                <input
                  type="text"
                  className="control"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  placeholder="Enter Image Url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <input
                  type="file"
                  id="image-file"
                  label="Choose File"
                  style={{ display: "block" }}
                  onChange={uploadFileHandler}
                />
                {uploading && <Loader />}
              </div>

              <div className="group">
                {message && (
                  <Message variant="danger" textcolor="red">
                    {message}
                  </Message>
                )}
              </div>

              <div className="group-margin">
                <div
                  className="btn account-btn"
                  style={{ width: "85%" }}
                  onClick={signUpHandler}
                >
                  Sign Up <i className="fas fa-arrow-circle-right"></i>
                </div>
                {uploading && <Loader />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupScreen;
