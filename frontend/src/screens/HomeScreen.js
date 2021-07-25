import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Nav from "../components/Nav";
import { useSelector, useDispatch } from "react-redux";
import { listDiary } from "../actions/diaryActions";
import Loader from "../components/Loader";
import DiaryFlex from "../components/DiaryFlex";
import { CREATE_DIARY_RESET } from "../constants/diaryConstant";
import AppLoader from "../components/AppLoader";
import Paginate from "../components/Paginate";
import SearchBox from "../components/SearchBox";
import Footer from "../components/Footer";

const HomeScreen = ({ match, history }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const userLoginGoogle = useSelector((state) => state.userLoginGoogle);
  const { userGoogle } = userLoginGoogle;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const diaryList = useSelector((state) => state.diaryList);
  const {
    loading,
    success: diarySuccess,
    diaries,
    pager,
    pageOfItems,
  } = diaryList;

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

  return (
    <>
      <Nav history={history} />

      <div
        className={diaries ? "new-wrapper wrappper-background" : "new-wrapper"}
      >
        <div id="main">
          <div id="main-contents">
            <div id="diary-content">
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
                      }}
                    >
                      Welcome{" "}
                      {(userInfo && userInfo.name) ||
                        (userGoogle && userGoogle.name)}
                    </h5>
                    <Route
                      render={({ history }) => <SearchBox history={history} />}
                    />
                  </div>
                  <div className="welcome-text">
                    <h5 className="big-heading main-heading">Public Diaries</h5>
                  </div>
                </>
              ) : (
                ""
              )}

              {/* condition 1 ends */}

              {/* Condition 2 starts */}

              {loading && <AppLoader />}

              {diaries
                ? diaries.map((diary) => (
                    <DiaryFlex
                      key={diary._id}
                      user={diary.user && diary.user.name}
                      title={diary.title}
                      body={diary.body}
                      image={diary.image}
                      readTime={diary.readTime}
                      id={diary._id}
                    />
                  ))
                : ""}

              {pager !== "" ? (
                diarySuccess && (
                  <Paginate pager={pager} keyword={keyword ? keyword : ""} />
                )
              ) : (
                <p>An Error occured Please Refresh the Page</p>
              )}

              {diarySuccess && diaries.length === 0 && (
                <div className="welcome-text">
                  <h1 className="big-heading">
                    Ooops we couldn't get any results 😪😪
                  </h1>
                </div>
              )}

              {/* condition 2 ends */}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
