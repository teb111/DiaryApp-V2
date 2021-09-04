import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import Joyride from "react-joyride";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import { listDiary } from "../actions/diaryActions";
import DiaryFlex from "../components/DiaryFlex";
import {
  CREATE_DIARY_RESET,
  DIARY_UPDATE_RESET,
} from "../constants/diaryConstant";
import AppLoader from "../components/AppLoader";
import Paginate from "../components/Paginate";
import SearchBox from "../components/SearchBox";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Top from "../components/Top";
import Message from "../components/Message";
import Meta from "../components/Meta";

const HomeScreen = ({ match, history }) => {
  const tourSteps = [
    {
      target: "#diary-content",
      placement: "center",
      title: "Walkthrough",
      content:
        "Seems like it’s your first time here. Follow this quick walkthrough to know how get around. ",
      disableBeacon: false,
    },
    {
      target: ".plus",
      content: "Click on the plus icon above to add a new diary.",
      disableBeacon: true,
    },
    {
      target: ".avatar",
      content:
        "Click on the avatar icon above to edit your profile, Upload an image to stop seeing this walkthrough steps",
      disableBeacon: true,
    },
    {
      target: ".sign-out",
      content: "Click on the Logout icon above to log out",
      disableBeacon: true,
    },
    {
      target: ".user",
      content: "Click on the username to check out their diaries",
      disableBeacon: true,
    },
  ];

  const keyword = match.params.keyword;
  const [steps] = useState(tourSteps);

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const userLoginGoogle = useSelector((state) => state.userLoginGoogle);
  const { userGoogle } = userLoginGoogle;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const diaryBookmark = useSelector((state) => state.diaryBookmark);
  const { message } = diaryBookmark;

  const diaryList = useSelector((state) => state.diaryList);
  const { loading, success: diarySuccess, diaries, pager, error } = diaryList;

  const diaryUpdate = useSelector((state) => state.diaryUpdate);
  const { success: successUpdate, error: errorUpdate } = diaryUpdate;

  useEffect(() => {
    if (!userGoogle && !userInfo) {
      history.push("/login");
    }
    if (successUpdate) {
      dispatch(listDiary(pageNumber, keyword));
      dispatch({ type: CREATE_DIARY_RESET });
    }
    dispatch({ type: DIARY_UPDATE_RESET });
    dispatch(listDiary(pageNumber, keyword));
  }, [
    userGoogle,
    history,
    userInfo,
    dispatch,
    successUpdate,
    pageNumber,
    keyword,
  ]);

  if (message) {
    $(".notify").toggleClass("active");
    $("#notifyType").toggleClass("success");
    setTimeout(function () {
      $(".notify").removeClass("active");
      $("#notifyType").removeClass("success");
    }, 3000);
  }

  return (
    <>
      {!(userInfo && userInfo.image) || (userGoogle && userGoogle.image) ? (
        <Joyride steps={steps} continuous={true} showSkipButton={true} />
      ) : (
        ""
      )}
      <Top />
      <Header history={history} />
      <Meta title="Public Diaries" />
      <div id="diary-content">
        {errorUpdate && (
          <Message textcolor="red" iconClass="fas fa-times" background="green">
            {errorUpdate} Sorry an Error Occured, Please Try Again
          </Message>
        )}

        {/* condition 1 starts */}
        {diaries ? (
          <>
            <div className="top-navigation">
              <h5
                className="small-heading"
                style={{
                  fontSize: "1.2em",
                  letterSpacing: "1.2px",
                  textAlign: "end",
                  paddingRight: "5px",
                  cursor: "pointer",
                }}
              >
                Welcome{" "}
                {(userInfo && userInfo.name) || (userGoogle && userGoogle.name)}
              </h5>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
              <div className="welcome-text explore-container">
                <p className="explore">Explore public diaries</p>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {/* condition 1 ends */}
        {/* Condition 2 starts */}
        {loading && <AppLoader />}
        <div className="notify">
          <span
            id="notifyType"
            className=""
            style={{
              letterSpacing: "2.2px",
              fontSize: "1.3em",
              display: "block",
              margin: "0 auto",
              paddingTop: "10px",
            }}
          >
            {message && message.message}
          </span>
        </div>
        {/* {message && alert(message.message)} */}
        {keyword && (
          <Link className="back-link" to="/">
            Go Back
          </Link>
        )}

        {diarySuccess && diaries.length === 0 && (
          <div className="welcome-text">
            <h1 className="big-heading">
              Ooops we couldn't get any results 😪😪
            </h1>
          </div>
        )}
        <div>
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
                  userId={diary.user?._id}
                />
              ))
            : error && (
                <div className="welcome-text">
                  <h1 className="big-heading">{error}</h1>
                </div>
              )}
        </div>

        {pager !== "" ? (
          diarySuccess && (
            <Paginate pager={pager} keyword={keyword ? keyword : ""} />
          )
        ) : (
          <p>An Error occured Please Refresh the Page</p>
        )}

        {/* condition 2 ends */}
      </div>
      <hr style={{ margin: "0" }} />
      <Footer />
    </>
  );
};

export default HomeScreen;
