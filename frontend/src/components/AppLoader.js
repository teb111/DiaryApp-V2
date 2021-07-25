import React from "react";
import "../App.css";

const AppLoader = ({ width }) => {
  return (
    <div
      className="welcome-text"
      style={{ marginTop: "8em", width: { width } }}
    >
      <div className="spinner-1"></div>
    </div>
  );
};

export default AppLoader;
