import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { useSelector, useDispatch } from "react-redux";
import { listDiary } from "../actions/diaryActions";
import Loader from "../components/Loader";
import DiaryFlex from "../components/DiaryFlex";
import Welcome from "../components/Welcome";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLoginGoogle = useSelector((state) => state.userLoginGoogle);
  const { userGoogle } = userLoginGoogle;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const diaryList = useSelector((state) => state.diaryList);
  const { loading, success, diaries, error } = diaryList;

  useEffect(() => {
    if (!userGoogle && !userInfo) {
      history.push("/login");
    }
    dispatch(listDiary());
  }, [userGoogle, history, userInfo, dispatch]);

  return (
    <>
      {/* Navigation starts */}
      <Nav />
      {/* Navigation Ends */}

      <div
        className={!diaries ? "new-wrapper wrappper-background" : "new-wrapper"}
      >
        <div id="main">
          <div id="main-contents">
            {diaries ? (
              <>
                <div className="top-navigation">
                  <div>
                    <input
                      className="crayons-header--search-input crayons-textfield"
                      type="text"
                      name="q"
                      placeholder="Search..."
                      autocomplete="off"
                      aria-label="search"
                      style={{
                        padding: "7px 10px",
                      }}
                    ></input>
                  </div>
                </div>
                <div className="welcome-text">
                  <h5 className="big-heading main-heading">Public Diaries</h5>
                </div>
              </>
            ) : (
              ""
            )}

            {diaries ? (
              diaries.map((diary) => (
                <>
                  {loading && <Loader />}
                  <DiaryFlex
                    id={diary._id}
                    user={diary.user && diary.user.name}
                    title={diary.title}
                    body={diary.body}
                  />
                </>
              ))
            ) : (
              <>{/* <Welcome /> */}</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
