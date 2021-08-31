import axios from "axios";
import {
  CREATE_DIARY_RESET,
  GET_USER_DIARY_FAIL,
} from "../constants/diaryConstant";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_GOOGLE_FAIL,
  USER_LOGIN_GOOGLE_REQUEST,
  USER_LOGIN_GOOGLE_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGOUT_GOOGLE,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  CREATE_BOOKMARK_FAIL,
  CREATE_BOOKMARK_REQUEST,
  CREATE_BOOKMARK_SUCCESS,
  GET_BOOKMARK_REQUEST,
  GET_BOOKMARK_SUCCESS,
  GET_BOOKMARK_FAIL,
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAIL,
} from "../constants/userConstant";

export const loginWithGoogle = (tokenId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_GOOGLE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // getting our response as we set it in our userController in the backend
    const { data } = await axios.post("/auth/google", { tokenId }, config);

    dispatch({
      type: USER_LOGIN_GOOGLE_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userGoogle", JSON.stringify(data));
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

export const logout = () => (dispatch) => {
  localStorage.removeItem("userGoogle");
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT_GOOGLE });
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: CREATE_DIARY_RESET });
};

export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/users", user, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBookmark = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_BOOKMARK_REQUEST }); // calls the DIARY_UPDATE_REQUEST reducer

    const {
      userLogin: { userInfo }, // we are destructuring two levels i.e getState().userLogin.userInfo
      userLoginGoogle: { userGoogle },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${
          (userGoogle && userGoogle.token) || (userInfo && userInfo.token)
        }`,
      },
    };

    const userId = `${
      (userGoogle && userGoogle._id) || (userInfo && userInfo._id)
    }`;

    const { data } = await axios.post(
      `/api/users/${userId}/bookmarks`,
      { id },
      config
    );

    dispatch({
      type: CREATE_BOOKMARK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BOOKMARK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); // calls the DIARY_CREATE_REVIEW_FAIL reducer
  }
};

export const getBookmark = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BOOKMARK_REQUEST }); // calls the DIARY_UPDATE_REQUEST reducer

    const {
      userLogin: { userInfo }, // we are destructuring two levels i.e getState().userLogin.userInfo
      userLoginGoogle: { userGoogle },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${
          (userGoogle && userGoogle.token) || (userInfo && userInfo.token)
        }`,
      },
    };

    const userId = `${
      (userGoogle && userGoogle._id) || (userInfo && userInfo._id)
    }`;

    const { data } = await axios.get(`/api/users/${userId}/bookmarks`, config);

    dispatch({
      type: GET_BOOKMARK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BOOKMARK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); // calls the GET_FAIL reducer
  }
};

export const editUserById = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_EDIT_REQUEST });

    const {
      userLogin: { userInfo }, // we are destructuring two levels i.e getState().userLogin.userInfo
      userLoginGoogle: { userGoogle },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${
          (userGoogle && userGoogle.token) || (userInfo && userInfo.token)
        }`,
      },
    };

    const { data } = await axios.put(`/api/users/`, user, config);

    dispatch({ type: USER_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); // calls the GET_FAIL reducer
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo }, // we are destructuring two levels i.e getState().userLogin.userInfo
      userLoginGoogle: { userGoogle },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${
          (userGoogle && userGoogle.token) || (userInfo && userInfo.token)
        }`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    console.log(data);

    dispatch({
      type: GET_USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); // calls the GET_FAIL reducer
  }
};
