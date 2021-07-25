import axios from "axios";
import {
  CREATE_DIARY_REQUEST,
  CREATE_DIARY_SUCCESS,
  CREATE_DIARY_FAIL,
  DIARY_LIST_REQUEST,
  DIARY_LIST_SUCCESS,
  DIARY_LIST_FAIL,
  DIARY_UPDATE_FAIL,
  DIARY_UPDATE_REQUEST,
  DIARY_UPDATE_SUCCESS,
  DIARY_LIST_ID_FAIL,
  DIARY_LIST_ID_REQUEST,
  DIARY_LIST_ID_SUCCESS,
} from "../constants/diaryConstant.js";

export const createDiary = () => async (dispatch, getState) => {
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

    const { data } = await axios.post("/api/diary", {}, config);

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

export const updateDiary = (diary) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIARY_UPDATE_REQUEST });

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

    const { data } = await axios.put(`/api/diary/${diary._id}`, diary, config);
    dispatch({ type: DIARY_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DIARY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listDiary =
  (pageNumber = "", keyword = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: DIARY_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/diary?pageNumber=${pageNumber}&keyword=${keyword}`
      );
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

export const getDiaryById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIARY_LIST_ID_REQUEST });
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

    const { data } = await axios.get(`/api/diary/${id}`, config);
    dispatch({ type: DIARY_LIST_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DIARY_LIST_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
