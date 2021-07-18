import axios from "axios";
import {
  CREATE_DIARY_REQUEST,
  CREATE_DIARY_SUCCESS,
  CREATE_DIARY_FAIL,
  DIARY_LIST_REQUEST,
  DIARY_LIST_SUCCESS,
  DIARY_LIST_FAIL,
} from "../constants/diaryConstant.js";

export const createDiary = (diary) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_DIARY_REQUEST });

    const {
      userLogin: { userInfo },
      userLoginGoogle: { userGoogle },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${
          (userGoogle && userGoogle.token) || (userInfo && userInfo.token)
        }`,
      },
    };

    const { data } = await axios.post("/api/diary", diary, config);

    dispatch({ type: CREATE_DIARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_DIARY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listDiary = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DIARY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
      userLoginGoogle: { userGoogle },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${
          (userGoogle && userGoogle.token) || (userInfo && userInfo.token)
        }`,
      },
    };

    const { data } = await axios.get("/api/diary", config);
    dispatch({ type: DIARY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DIARY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
