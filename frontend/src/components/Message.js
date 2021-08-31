import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children, iconClass, textcolor, background }) => {
  return (
    <Alert
      style={{
        background: "#262626",
        width: "80vw",
        display: "block",
        textAlign: "center",
        margin: "0 auto",
        padding: "3px",
        marginbottom: "2px",
      }}
      variant={variant}
    >
      <p style={{ color: textcolor, fontSize: "15px" }}>
        {" "}
        <i className={iconClass}></i> &nbsp;
        {children}
      </p>
    </Alert>
  );
};

Message.defaultProps = {
  variant: "info",
  background: "green",
};

export default Message;
