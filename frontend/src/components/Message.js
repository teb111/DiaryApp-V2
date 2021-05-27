import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return (
    <Alert
      style={{
        background: "#fffffff5",
        color: "#ff0000c9",
        width: "max-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
        borderRadius: "5px",
        marginbottom: "5px",
      }}
      variant={variant}
    >
      <i class="fas fa-ban"></i> &nbsp;
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
