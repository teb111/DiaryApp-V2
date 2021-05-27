import React, { useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = ({ history }) => {
  const userLoginGoogle = useSelector((state) => state.userLoginGoogle);
  const { userGoogle } = userLoginGoogle;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userGoogle && !userInfo) {
      history.push("/login");
    }
  }, [userGoogle, history, userInfo]);

  return <Header />;
};

export default HomeScreen;
