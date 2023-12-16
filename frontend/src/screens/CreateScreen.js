import axios from "axios"
import { createClient } from "pexels"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EditorState, ContentState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import { convertToHTML } from "draft-convert"
import htmlToDraft from "html-to-draftjs"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import Header from "../components/Header"
import Loader from "../components/Loader"
import { getDiaryById, updateDiary } from "../actions/diaryActions"
import AppLoader from "../components/AppLoader"
import { DIARY_UPDATE_RESET } from "../constants/diaryConstant"
import Footer from "../components/Footer"
import Meta from "../components/Meta"

const CreateScreen = ({ match, history }) => {
  const diaryId = match.params.id

  // states
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [uploading, setUploading] = useState(false)
  const [isPublic, setIsPublic] = useState(true)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const [unsplashImage, setUnsplashImage] = useState([])
  const [imageLoading, setImageLoading] = useState(true)
  const [author, setAuthor] = useState("Author")
  const [link, setLink] = useState("")
  const [authorLink, setAuthorLink] = useState("")

  const client = createClient(process.env.REACT_APP_CLIENT_ID)

  const dispatch = useDispatch()

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)

    const contentState = convertToHTML({
      blockToHTML: (block) => {
        if (block.type === "image") {
          return <img src={block.data.url} alt={block.text} />
        }
        if (block.type === "code") {
          return (
            <pre>
              <code>{block.text}</code>
            </pre>
          )
        }
      }
    })(editorState._immutable.currentContent)
    setBody(contentState)
  }

  const diaryListById = useSelector((state) => state.diaryListById)
  const { loading, diary, error } = diaryListById

  const diaryUpdate = useSelector((state) => state.diaryUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate
  } = diaryUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DIARY_UPDATE_RESET })
      history.push(`/details/${diaryId}`)
    } else {
      if (!diary?.title || diary?._id !== diaryId) {
        dispatch(getDiaryById(diaryId))
      } else {
        setTitle(diary.title)

        setImage(diary.image)
        setIsPublic(diary.isPublic)
        setImage(diary.image)
        setBody(diary.body)
        const contentBlock = htmlToDraft(diary.body)
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        )
        const bodyState = EditorState.createWithContent(contentState)
        setEditorState(bodyState)
      }
    }
  }, [history, dispatch, diaryId, diary, successUpdate])

  //image uploading
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    setUploading(true)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }

      const { data } = await axios.post("/api/uploads", formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const unsplashImages = (query) => {
    client.photos.search({ query, per_page: 10 }).then((photos) => {
      setUnsplashImage(photos.photos)
      setImageLoading(false)
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateDiary({
        _id: diaryId,
        title,
        body,
        image,
        isPublic,
        author,
        link,
        authorLink
      })
    )
  }

  const geturl = (img) => {
    setImage(img.src.original)
    setAuthor(img.photographer)
    setLink(
      `${img.url}?utm_source=peexels&utm_diaryapp-v2=referral&utm_content=creditCopyTex`
    )
    setAuthorLink(
      `${img.photographer_url}?utm_source=pexels&utm_diaryapp-v2=referral&utm_content=creditCopyTex`
    )

    setImageLoading(true)
  }

  return (
    <>
      <Header history={history} />
      <Meta title="Create a new Diary" />
      <div className="welcome-text">
        <h4 className="small-heading" style={{ color: "#010400" }}>
          {diary?.title === "New Title" ? "Add a New Diary" : "Edit your Diary"}
        </h4>
      </div>
      {loading && <AppLoader />}

      {error && (
        <div className="welcome-text">
          <h4 className="small-heading" style={{ color: "red" }}>
            {error}
          </h4>
        </div>
      )}
      {loadingUpdate ? (
        <AppLoader />
      ) : (
        <div className="form-container">
          <form>
            <div className="group">
              <input
                type="text"
                className="control"
                placeholder="Give Your Diary a Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  borderWidth: "0px",
                  borderBottom: "1px solid #1a1a1a",
                  fontSize: "1.4rem",
                  letterSpacing: "1.2px"
                }}
              />
            </div>

            <div
              className="group "
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "98%"
              }}
            >
              <div className="editor control">
                <Editor
                  className="control"
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  toolbar={{
                    options: [
                      "inline",
                      "blockType",
                      "fontSize",
                      "textAlign",
                      "list"
                    ],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true }
                  }}
                />
              </div>
            </div>

            <div
              className="group"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "98%"
              }}
            >
              <label className="form-label" style={{ fontSize: "1.1rem" }}>
                Image:
              </label>
              <input
                type="text"
                style={{
                  padding: "4px",
                  width: "50%",
                  marginRight: "5px",
                  marginLeft: "2px"
                }}
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
                    : image
                }
                alt=""
                className={
                  image.includes("sample.jpg") ? "no-image" : "image-preview"
                }
              />
            </div>

            <div className="group">
              <input
                type="text"
                style={{ padding: "4px", width: "90%", marginTop: "4px" }}
                className="control searchTerm"
                placeholder="Type keywords to search PEXELS for any image then enter"
                onKeyUp={(e) => {
                  unsplashImages(e.target.value)
                }}
              />
              <div
                className="image-container"
                style={{
                  marginTop: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#1a1a1a",
                  width: "70%"
                }}
              >
                <div
                  style={{
                    display: "grid",

                    gridTemplateColumns: "repeat(2,minmax(0,1fr))",
                    flexWrap: "wrap"
                  }}
                >
                  {!imageLoading
                    ? unsplashImage?.map((img) => (
                        <img
                          key={img.id}
                          src={img.src.original}
                          alt=""
                          style={{ cursor: "pointer" }}
                          onClick={() => geturl(img)}
                          width="100"
                          height="100"
                          loading="eager"
                        />
                      ))
                    : ""}
                </div>
              </div>
            </div>

            <div
              className="group"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "98%"
              }}
            >
              <label className="form-label">
                Make Posts Private{" "}
                <span style={{ fontSize: "14px", color: "grey" }}>
                  (Post are Public by Default)
                </span>
              </label>{" "}
              <input
                type="checkbox"
                onChange={(e) => setIsPublic(!isPublic)}
                style={{ margin: "2px", width: "30px", height: "28px" }}
                checked={isPublic === false ? true : false}
              />
            </div>

            <div className="group">
              <div
                className="btn account-btn"
                style={{ width: "90%", textAlign: "center", color: "#1a1a1a" }}
                onClick={submitHandler}
              >
                {diary?.title === "New Title" ? "Create Diary" : "Edit Diary"}{" "}
                <i className="fas fa-arrow-circle-right"></i>
              </div>
              {errorUpdate && (
                <strong
                  style={{
                    color: "#1a1a1a",
                    padding: "4px",
                    letterSpacing: "2px",
                    fontSize: "20px",
                    textAlign: "center",
                    backgroundColor: "red"
                  }}
                >
                  {error}
                </strong>
              )}
            </div>
          </form>
        </div>
      )}

      <Footer />
    </>
  )
}

export default CreateScreen
