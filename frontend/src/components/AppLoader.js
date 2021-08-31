import React from "react";
import "../App.css";

const AppLoader = ({ width, text }) => {
  return (
    <div
      className="welcome-text"
      style={{ marginTop: "8em", width: { width } }}
    >
      <div className="classic-1">
        <i
          className="fas fa-book-open header-icon"
          style={{ fontSize: "35px" }}
        ></i>
        {text}
      </div>
      <div className="spinner-1"></div>
    </div>
  );
};

AppLoader.defaultProps = {
  text: "DIARYAPP-V2",
};

export default AppLoader;
