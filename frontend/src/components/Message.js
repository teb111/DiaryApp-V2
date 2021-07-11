import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children, iconClass, textcolor }) => {
  return (
    <Alert
      style={{
        background: "#fffffff5",
        width: "max-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
};

export default Message;
