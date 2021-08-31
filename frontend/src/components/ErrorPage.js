import React from "react";

const ErrorPage = ({ error, info }) => {
  return (
    <div class="error-container">
      <div className="error">😪</div>
      <br />
      <br />
      <span className="info">{error}</span>
      <br />
      <br />
      <span>Please Try Refreshing the Page</span>
      <img
        src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif"
        class="static"
        alt="error"
      />
    </div>
  );
};

ErrorPage.defaultProps = {
  error: "404",
  info: "Sorry an Error Occured 😪😪",
};

export default ErrorPage;
