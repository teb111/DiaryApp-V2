import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { createDiaryReview, getDiaryById } from "../actions/diaryActions"
import AppLoader from "../components/AppLoader"
import Header from "../components/Header"
import Rating from "../components/Rating"
import Top from "../components/Top"
import Message from "../components/Message"
import ErrorPage from "../components/ErrorPage"
import { DIARY_CREATE_REVIEW_REQUEST } from "../constants/diaryConstant"
import parse from "html-react-parser"
import Footer from "../components/Footer"
import Meta from "../components/Meta"

const DiaryScreen = ({ match, history }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const diaryId = match.params.id
  const dispatch = useDispatch()

  const diaryListById = useSelector((state) => state.diaryListById)
  const { loading, success, error, diary } = diaryListById

  const userLoginGoogle = useSelector((state) => state.userLoginGoogle)
  const { userGoogle } = userLoginGoogle

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const diaryCreateReview = useSelector((state) => state.diaryCreateReview)
  const { success: successDiaryReview, error: errorDiaryReview } =
    diaryCreateReview

  useEffect(() => {
    if (successDiaryReview) {
      alert("Review Created")
      setRating(0)
      setComment("")
      dispatch({ type: DIARY_CREATE_REVIEW_REQUEST })
    }
    dispatch(getDiaryById(match.params.id))
  }, [dispatch, match, successDiaryReview])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createDiaryReview(match.params.id, { rating, comment }))
  }

  return (
    <>
      <Top />

      <Header history={history} />

      <Meta title={diary && diary.title} />

      <div className="diary-container">
        {/* {error && <ErrorPage error={error} />} */}
        {loading && <AppLoader />}

        {success && (
          <>
            <div className="welcome-text">
              <h1 className="big-heading heading" style={{ fontSize: "27px" }}>
                {diary.title}{" "}
              </h1>
            </div>
            <div style={{ paddingLeft: "30px" }}>
              <div>
                <a
                  href={`/user/${diary?.user && diary.user?._id}`}
                  style={{
                    letterSpacing: "1.4px",
                    fontWeight: "100",
                    color: "#1a1a1a"
                  }}
                >
                  {diary.user && diary.user.name} &nbsp;{" "}
                </a>

                {(userGoogle && userGoogle._id) === diary.user._id ||
                (userInfo && userInfo._id) === diary.user._id ? (
                  <>
                    <Link style={{ color: "black" }} to={`/edit/${diary._id}`}>
                      <i
                        className="fas fa-pencil-alt"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </Link>
                  </>
                ) : (
                  ""
                )}
                <br />

                {console.log(diary.author)}

                <span style={{ letterSpacing: "1.2px" }}>
                  {Date(diary.createdAt).substring(0, 10)}. &nbsp;
                </span>
                <span style={{ letterSpacing: "1.2px" }}>{diary.readTime}</span>
              </div>
              <Rating
                value={Number(diary.rating)}
                text={`${diary.numReviews} comment(s)`}
              />
            </div>
            <figure>
              <div className="image-container">
                <img
                  src={diary.image}
                  alt={diary.title}
                  width="500"
                  height="500"
                />
              </div>
              {diary.author ? (
                <div
                  className="group"
                  style={{ color: "grey", letterSpacing: "1.7px" }}
                >
                  Photo by &nbsp;{" "}
                  <a
                    href={diary.authorlink}
                    style={{ color: "#1a1a1a", textTransform: "uppercase" }}
                  >
                    {diary.author}
                  </a>{" "}
                  &nbsp; from &nbsp;{" "}
                  <a
                    href={diary.link}
                    style={{ color: "#1a1a1a", textTransform: "uppercase" }}
                  >
                    Pexels
                  </a>
                </div>
              ) : (
                <div
                  className="group"
                  style={{ color: "grey", letterSpacing: "1.7px" }}
                >
                  Photo by &nbsp;{" "}
                  <span
                    style={{ color: "#1a1a1a", textTransform: "uppercase" }}
                  >
                    author
                  </span>{" "}
                </div>
              )}
            </figure>
            <div className="diary-body">{parse(diary.body)}</div>
            <hr />
            <h2 className="comments">Comments</h2>
            {diary.comment.length === 0 && (
              <p className="diary-text alert">No comment(s) yet on this post</p>
            )}
            <div className="list-group">
              {diary.comment.map((d) => (
                <div className="list-group-item" key={d._id}>
                  <strong className="text-decoration">{d.name}</strong>
                  <Rating style={{ paddingLeft: "0" }} value={d.rating} />
                  <p className="text-decoration">
                    {Date(d.createdAt).substring(0, 10)}
                  </p>
                  <p className="text-decoration">{d.comment}</p>
                </div>
              ))}
            </div>
            <div
              className="form-container list-group"
              style={{ background: "none" }}
            >
              {(userGoogle && userGoogle.token) ||
              (userInfo && userInfo.token) ? (
                <form className="diary-form">
                  <h2 className="comments">Leave a comment</h2>
                  {errorDiaryReview && (
                    <Message style={{ color: "red" }}>
                      {errorDiaryReview}
                    </Message>
                  )}
                  <div className="group">
                    <label className="form-label" style={{ fontSize: "16px" }}>
                      Rating
                    </label>
                    <select
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="ratings"
                    >
                      <option value="">Select .....</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>

                  <div className="group">
                    <label className="form-label" style={{ fontSize: "16px" }}>
                      Comment
                    </label>
                    <textarea
                      className="control"
                      value={comment}
                      id="body"
                      name="body"
                      required={true}
                      placeholder="Say something about this post"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="group">
                    <div
                      className="btn account-btn"
                      style={{
                        width: "85%",
                        textAlign: "center",
                        color: "black"
                      }}
                      onClick={submitHandler}
                    >
                      Submit Comment{" "}
                      <i className="fas fa-arrow-circle-right"></i>
                    </div>
                  </div>
                </form>
              ) : (
                <h3>Please Log in</h3>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default DiaryScreen
