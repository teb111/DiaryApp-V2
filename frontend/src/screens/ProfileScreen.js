import axios from "axios";
import $ from "jquery";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Top from "../components/Top";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { editUserById } from "../actions/userActions";
import { getUserDiary } from "../actions/diaryActions";
import DiaryFlex from "../components/DiaryFlex";
import Meta from "../components/Meta";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [instagram, setInstagram] = useState("");
  const [uploading, setUploading] = useState("");
  const [message, setMessage] = useState("");

  const userLoginGoogle = useSelector((state) => state.userLoginGoogle);
  const { userGoogle } = userLoginGoogle;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const editUser = useSelector((state) => state.editUser);
  const { loading, success } = editUser;

  const getUserDiaries = useSelector((state) => state.getUserDiaries);
  const { diaries, error } = getUserDiaries;

  useEffect(() => {
    setName((userInfo && userInfo.name) || (userGoogle && userGoogle.name));
    setEmail((userInfo && userInfo.email) || (userGoogle && userGoogle.email));
    setTwitter(
      (userInfo && userInfo.twitter) || (userGoogle && userGoogle.twitter)
    );
    setLinkedIn(
      (userInfo && userInfo.linkedIn) || (userGoogle && userGoogle.linkedIn)
    );
    setInstagram(
      (userInfo && userInfo.instagram) || (userGoogle && userGoogle.instagram)
    );
    dispatch(getUserDiary());
  }, [userInfo, userGoogle, dispatch]);

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

  const editProfileHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match, Please confirm and ReType");
    } else {
      dispatch(
        editUserById({
          name,
          email,
          password,
          bio,
          linkedIn,
          twitter,
          instagram,
          image,
        })
      );
    }
  };

  $(".hide-form").on("click", (e) => {
    $(".form-container").hide();
  });
  $(".show-form").on("click", (e) => {
    $(".form-container").show();
  });

  return (
    <>
      <Top />
      <Header history={history} />
      <Meta
        title={(userInfo && userInfo.name) || (userGoogle && userGoogle.name)}
      />

      <h1
        className="heading"
        style={{
          letterSpacing: "1.5px",
          marginBottom: "0",
          fontWeight: "300",
          fontSize: "1.1rem",
        }}
      >
        Edit Your Profile and view your diaries
      </h1>
      <hr style={{ marginTop: "0" }} />
      <p
        style={{
          padding: "5px",
          paddingLeft: "10px",
          letterSpacing: "1.2px",
          fontSize: "1.1rem",
        }}
      >
        Hi there,{" "}
        {(userInfo && userInfo.name) || (userGoogle && userGoogle.name)}
      </p>

      <div
        className="welcome-text"
        style={{
          justifyContent: "space-around",
          backgroundColor: "#1a1a1a",
          color: "#ccc",
          padding: "5px",
        }}
      >
        <div
          className="hide-form"
          style={{
            fontSize: "1rem",
            cursor: "pointer",
            letterSpacing: "1.2px",
          }}
        >
          Hide Form
        </div>
        <div
          className="show-form"
          style={{
            fontSize: "1rem",
            cursor: "pointer",
            letterSpacing: "1.2px",
          }}
        >
          Show Form
        </div>
      </div>
      <div className="form-container" id="diary-content">
        <form>
          <>
            <div className="group">
              <input
                type="text"
                className="control new-control"
                placeholder="Edit your Display Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="form-label" style={{ fontSize: "14px" }}>
                Your name appears on your Profile page, as your byline, and in
                your responses. It is a required field.
              </label>
            </div>
            <div className="group">
              <input
                type="text"
                className="control new-control"
                placeholder="Change your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label" style={{ fontSize: "14px" }}>
                Please make sure your new email is active as it will be
                confirmed with a code sent to it
              </label>
            </div>
            <div className="group">
              <input
                type="text"
                className="control new-control"
                placeholder="Bio Goes in here"
                maxLength="150"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <label className="form-label" style={{ fontSize: "14px" }}>
                Your bio appears on your Profile and next to your diary. Max 150
                characters.
              </label>
            </div>
            <div className="group">
              <input
                type="text"
                className="control new-control"
                value={password}
                placeholder="New password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label" style={{ fontSize: "14px" }}>
                Once you change your password, you have wait another 14days to
                change it again. Leave the field blank if you do not want to
                change it
              </label>
            </div>
            <div className="group">
              <input
                type="text"
                className="control new-control"
                value={confirmPassword}
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label className="form-label" style={{ fontSize: "14px" }}>
                Once you change your password, you have wait another 14days to
                change it again
              </label>
            </div>
            <div className="group">
              {message && (
                <Message variant="danger" textcolor="red">
                  {message}
                </Message>
              )}
            </div>
            <div className="group" style={{ display: "block" }}>
              <input
                type="text"
                className="control"
                placeholder="Enter Image Url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <input
                type="file"
                id="image-file"
                label="Choose File"
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </div>
            {/* 
            <div
              className="group"
              style={{ margin: "0 auto", display: "flex" }}
            >
              <img
                src={
                  image.startsWith("https")
                    ? image
                    : image === "/uploads/sample.jpg"
                    ? null
                    : !image
                    ? ""
                    : image
                }
                alt=""
                className={
                  image.includes("sample.jpg") ? "no-image" : "image-preview"
                }
              />
            </div> */}

            <div
              className="group"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i class="fab fa-twitter footer-icons"></i>{" "}
              <input
                type="text"
                className="control new-control"
                placeholder="Enter Twitter Url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>

            <div
              className="group"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i class="fab fa-linkedin-in footer-icons"></i>
              <input
                type="text"
                className="control new-control"
                placeholder="Enter LinkedIn Url"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </div>

            <div
              className="group"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i class="fab fa-instagram footer-icons"></i>
              <input
                type="text"
                className="control new-control"
                placeholder="Enter Instagram Url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div
              className="group"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading && <Loader />}
            </div>
            <div
              className="btn account-btn"
              style={{
                width: "auto",
                textAlign: "center",
                color: "#1a1a1a",
                marginBottom: "10px",
              }}
              onClick={editProfileHandler}
            >
              Save Changes
              <i className="fas fa-arrow-circle-right"></i>
            </div>
            <div className="group">
              {success && (
                <Message variant="danger" textcolor="grey">
                  Profile Updated successfuly, Changes will take Effect on Login
                </Message>
              )}
            </div>
          </>
        </form>
      </div>
      <div id="diary-content">
        <div className="welcome-text">
          <h1 className="small-heading heading">Your Diaries</h1>
        </div>
        {diaries
          ? diaries.map((diary) => (
              <DiaryFlex
                key={diary._id}
                user={diary.user && diary.user.name}
                userImage={diary.user && diary.user.image}
                title={diary.title}
                body={diary.body}
                image={diary.image}
                readTime={diary.readTime}
                id={diary._id}
                userId={diary.user._id}
              />
            ))
          : error && (
              <div className="welcome-text">
                <h1 className="big-heading">{error}</h1>
              </div>
            )}
      </div>
      <Footer />
    </>
  );
};

export default ProfileScreen;
