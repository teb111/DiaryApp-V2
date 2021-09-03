import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { createDiary } from "../actions/diaryActions";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const userLoginGoogle = useSelector((state) => state.userLoginGoogle);
  const { userGoogle } = userLoginGoogle;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const diaryCreate = useSelector((state) => state.diaryCreate);
  const {
    loading,
    success: successCreate,
    diary: createdDiary,
    error: errorCreate,
  } = diaryCreate;

  useEffect(() => {
    if (successCreate) {
      history.push(`/edit/${createdDiary._id}`);
    }
  }, [successCreate, history, createdDiary, errorCreate]);

  const logoutHandler = () => {
    dispatch(logout());
    console.log("logout");
  };
  const createDiaryHandler = () => {
    dispatch(createDiary());
  };

  return (
    <>
      <div className="header">
        <h6>
          <a href="/" style={{ color: "#000" }}>
            <i className="fas fa-book-open header-icon"></i>Diaryapp-v2{" "}
          </a>
        </h6>
        <ul className="header-list" style={{ display: "flex" }}>
          <Link to="/bookmarks" style={{ marginRight: "4px" }}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              className="jk"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 3a2 2 0 0 0-2 2v1H6a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4V8a2 2 0 0 0-2-2H9V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v12a.5.5 0 1 0 1 0V5a2 2 0 0 0-2-2h-9zM5 8a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v12.98l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V8z"
                fill="#757575"
                title="Bookmarks"
              ></path>
            </svg>
          </Link>
          <li style={{ marginRight: "5px", marginLeft: "5px" }}>
            <a href="/profile">
              {/* <i
                className="far fa-user"
                style={{ fontSize: "1.4em", color: "rgba(117, 117, 117, 1)" }}
              ></i> */}

              <img
                src={
                  (userInfo && userInfo.image) ||
                  (userGoogle && userGoogle.image)
                }
                alt="you"
                style={{
                  fontSize: "1.4em",
                  color: "rgba(117, 117, 117, 1)",
                  borderRadius: "8px",
                }}
                width="30"
                height="25"
              />
            </a>
          </li>

          {loading ? (
            <li
              style={{
                marginRight: "10px",
                marginLeft: "10px",
                fontSize: "1.4em",
                color: "rgba(117, 117, 117, 1)",
              }}
            >
              {" "}
              <Loader />{" "}
            </li>
          ) : (
            <li
              onClick={createDiaryHandler}
              style={{
                marginRight: "10px",
                marginLeft: "10px",
                fontSize: "1.4em",
                color: "rgba(117, 117, 117, 1)",
              }}
            >
              <i className="fas fa-plus" title="Create Diary"></i>
            </li>
          )}

          <li
            style={{
              marginLeft: "4px",
              fontSize: "1.4em",
              color: "rgba(117, 117, 117, 1)",
            }}
            onClick={logoutHandler}
          >
            <i className="fas fa-sign-out-alt" title="Sign Out"></i>
          </li>
        </ul>
      </div>
      <hr style={{ color: "#ccc", margin: "1.1px" }} />
    </>
  );
};

export default Header;
