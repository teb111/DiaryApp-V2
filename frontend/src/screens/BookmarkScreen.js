import React, { useEffect } from "react";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Top from "../components/Top";
import { getBookmark } from "../actions/userActions";
import DiaryFlex from "../components/DiaryFlex";
import AppLoader from "../components/AppLoader";
import Meta from "../components/Meta";

const BookmarkScreen = ({ history }) => {
  const dispatch = useDispatch();

  const getBookmarks = useSelector((state) => state.getBookmarks);
  const { loading, success, bookmarks } = getBookmarks;

  const diaryBookmark = useSelector((state) => state.diaryBookmark);
  const { message } = diaryBookmark;

  useEffect(() => {
    dispatch(getBookmark());
  }, [dispatch]);

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
      <Top />
      <Header history={history} />
      <Meta title="Your Bookmarks" />
      <h1
        className="heading"
        style={{ letterSpacing: "2px", marginBottom: "0", fontWeight: "300" }}
      >
        Your Bookmarks
      </h1>
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
      <hr style={{ marginTop: "0" }} />
      <div id="diary-content">
        {loading && <AppLoader />}
        <div>
          {success
            ? bookmarks.map((book) => (
                <DiaryFlex
                  key={book._id}
                  user={book.user && book.user.name}
                  userImage={book.user && book.user.image}
                  title={book.title}
                  body={book.body}
                  image={book.image}
                  readTime={book.readTime}
                  id={book._id}
                />
              ))
            : ""}
        </div>
        {bookmarks && bookmarks.length === 0 ? (
          <div className="welcome-text">
            <h3>You have no post bookmarked</h3>
          </div>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </>
  );
};

export default BookmarkScreen;
