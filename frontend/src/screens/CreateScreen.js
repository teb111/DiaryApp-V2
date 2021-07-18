import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { createDiary } from "../actions/diaryActions";
import { CREATE_DIARY_RESET } from "../constants/diaryConstant.js";

const CreateScreen = ({ history }) => {
  const dispatch = useDispatch();

  // states
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const diaryCreate = useSelector((state) => state.diaryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = diaryCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: CREATE_DIARY_RESET });
      history.push("/");
    }
  }, [history, successCreate, dispatch]);
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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createDiary({ title, body, image, isPublic }));
  };

  return (
    <>
      <div className="group" style={{ marginBottom: "5px", marginTop: "15px" }}>
        <Link
          to="/"
          className="btn account-btn"
          style={{
            width: "85%",
            marginBottom: "5px",
            marginTop: "3px",
            textAlign: "center",
          }}
        >
          <i className="fas fa-arrow-circle-left"></i> Go Back
        </Link>
      </div>
      <div className="welcome-text">
        <h4 className="small-heading" style={{ color: "#010400" }}>
          Add a New Diary
        </h4>
      </div>
      <div className="form-container">
        <form>
          <div className="group">
            <label className="form-label">Title:</label>
            <input
              type="email"
              value={title}
              className="control"
              placeholder="Give Your Diary a Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="group">
            <label className="form-label">Body:</label>
            <textarea
              className="control"
              value={body}
              id="body"
              name="body"
              placeholder="Share how you truly feel"
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>

          <div className="group">
            <label className="form-label">Image</label>
            <input
              type="text"
              style={{ padding: "4px", width: "30%" }}
              className="control"
              placeholder="Enter Image Url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <input
              type="file"
              id="image-file"
              label="Choose File"
              custom
              onChange={uploadFileHandler}
            />
            {uploading && <Loader />}
          </div>

          <div className="group">
            <label className="form-label">
              Make Posts Public{" "}
              <span style={{ fontSize: "12px", color: "grey" }}>
                (Post are Private by Default)
              </span>
            </label>{" "}
            <input
              type="checkbox"
              value={isPublic}
              onChange={(e) => setIsPublic(!isPublic)}
              style={{ margin: "2px" }}
            />
          </div>

          <div className="group">
            <div
              className="btn account-btn"
              style={{ width: "85%", textAlign: "center" }}
              onClick={submitHandler}
            >
              Create Diary <i className="fas fa-arrow-circle-right"></i>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateScreen;
