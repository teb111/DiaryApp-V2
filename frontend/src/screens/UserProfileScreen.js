import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Top from "../components/Top";
import { getUserDiary } from "../actions/diaryActions";
import DiaryFlex from "../components/DiaryFlex";
import Footer from "../components/Footer";
import { getUserDetails } from "../actions/userActions";
import AppLoader from "../components/AppLoader";
import Meta from "../components/Meta";

const UserProfileScreen = ({ match, history }) => {
  const userId = match.params.id;

  const dispatch = useDispatch();

  const getUserDiaries = useSelector((state) => state.getUserDiaries);
  const { diaries, error } = getUserDiaries;

  const publicDiaries =
    diaries && diaries.filter((diary) => Boolean(diary.isPublic));

  const getUserDetail = useSelector((state) => state.getUserDetail);
  const { loading, user } = getUserDetail;

  useEffect(() => {
    dispatch(getUserDiary({ userId }));
    dispatch(getUserDetails(userId));
  }, [dispatch, userId, match]);

  return (
    <>
      <Top />
      <Header history={{ history }} />
      <Meta title={user && user.name} />
      <div className="welcome-text">
        {user && user.image && (
          <img
            src={user && user.image}
            alt={user && user.name}
            width="250"
            height="250"
            style={{ borderRadius: "50%", marginTop: "10px" }}
          />
        )}
      </div>
      <div className="welcome-text">
        {loading && <AppLoader />}
        <h5
          className="big-heading heading"
          style={{ color: "#1a1a1a", margin: "5px" }}
        >
          {user && user.name}
        </h5>
      </div>
      <a
        className="text-align"
        href={`mailto:${user && user.email}`}
        style={{
          marginBottom: "5px",
          fontSize: ".9em",
        }}
      >
        {" "}
        {user && user.email}
      </a>
      <p className="text-align">{user && user.bio}</p>
      <div style={{ marginLeft: "-65px" }}>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {user && user.twitter && (
            <li>
              <a href={user && user.twitter} target="_blank" rel="noreferrer">
                <i className="fab fa-twitter footer-icons"></i>
              </a>
            </li>
          )}

          {user && user.linkedIn && (
            <li>
              <a href={user && user.linkedIn} target="_blank" rel="noreferrer">
                <i className="fab fa-linkedin footer-icons"></i>
              </a>
            </li>
          )}

          {user && user.instagram && (
            <li>
              <a href={user && user.instagram} target="_blank" rel="noreferrer">
                <i className="fab fa-instagram footer-icons"></i>
              </a>
            </li>
          )}
        </ul>
      </div>
      <div id="diary-content">
        <p className="text-align"> Diaries by {user && user.name} </p>

        {publicDiaries
          ? publicDiaries.map((diary) => (
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

export default UserProfileScreen;
