import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Welcome = () => {
  const userLoginGoogle = useSelector((state) => state.userLoginGoogle);
  const { userGoogle } = userLoginGoogle;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div>
      <div className="welcome-text">
        <h5 className="big-heading">
          Welcome{" "}
          <strong>
            {userGoogle ? userGoogle.name : userInfo ? userInfo.name : ""}
          </strong>
        </h5>
      </div>
      <br />
      <br />
      <div className=" welcome-text diaries">
        <h5 className="small-heading">
          {" "}
          You have No Diaries Here yet <br />
          Click the icon below to get started
        </h5>
      </div>

      <div className="welcome-text">
        <Link to="">
          <i style={{ color: "white" }} className="fas fa-plus-circle"></i>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
