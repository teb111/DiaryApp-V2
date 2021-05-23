import axios from "axios";
import {
  USER_LOGIN_GOOGLE_FAIL,
  USER_LOGIN_GOOGLE_REQUEST,
  USER_LOGIN_GOOGLE_SUCCESS,
} from "../constants/userConstant";

export const loginWithGoogle = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_GOOGLE_REQUEST,
    });

    // getting our response as we set it in our userController in the backend
    const { data } = await axios.get("/auth/google");

    dispatch({
      type: USER_LOGIN_GOOGLE_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_GOOGLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
