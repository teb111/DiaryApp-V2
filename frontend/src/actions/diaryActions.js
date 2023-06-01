import axios from "axios"
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
  DIARY_CREATE_REVIEW_REQUEST,
  DIARY_CREATE_REVIEW_SUCCESS,
  DIARY_CREATE_REVIEW_FAIL,
  GET_USER_DIARY_REQUEST,
  GET_USER_DIARY_SUCCESS,
  GET_USER_DIARY_FAIL
} from "../constants/diaryConstant.js"

export const createDiary = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_DIARY_REQUEST })

    const {
      userLogin: { userInfo },
      userLoginGoogle: { userGoogle }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${
          (userGoogle && userGoogle.token) || (userInfo && userInfo.token)
        }`
      }
    }

    const { data } = await axios.post(
      "https://diary-liv9.onrender.com/api/diary",
      {},
      config
    )

    dispatch({ type: CREATE_DIARY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CREATE_DIARY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updateDiary = (diary) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIARY_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
      userLoginGoogle: { userGoogle }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${
          (userGoogle && userGoogle.token) || (userInfo && userInfo.token)
        }`
      }
    }

    const { data } = await axios.put(
      `https://diary-liv9.onrender.com/api/diary/${diary._id}`,
      diary,
      config
    )
    dispatch({ type: DIARY_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DIARY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listDiary =
  (pageNumber = "", keyword = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: DIARY_LIST_REQUEST })

      const { data } = await axios.get(
        `https://diary-liv9.onrender.com/api/diary?pageNumber=${pageNumber}&keyword=${keyword}`
      )
      dispatch({ type: DIARY_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: DIARY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export const getDiaryById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIARY_LIST_ID_REQUEST })

    const {
      userLogin: { userInfo },
      userLoginGoogle: { userGoogle }
    } = getState()

    const { data } = await axios.get(
      `https://diary-liv9.onrender.com/api/diary/${id}`
    )
    dispatch({ type: DIARY_LIST_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DIARY_LIST_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const createDiaryReview =
  (diaryId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: DIARY_CREATE_REVIEW_REQUEST }) // calls the DIARY_UPDATE_REQUEST reducer

      const {
        userLogin: { userInfo }, // we are destructuring two levels i.e getState().userLogin.userInfo
        userLoginGoogle: { userGoogle }
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${
            (userGoogle && userGoogle.token) || (userInfo && userInfo.token)
          }`
        }
      }

      await axios.post(
        `https://diary-liv9.onrender.com/api/diary/${diaryId}/reviews`,
        review,
        config
      )

      dispatch({
        type: DIARY_CREATE_REVIEW_SUCCESS
      })
    } catch (error) {
      dispatch({
        type: DIARY_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      }) // calls the DIARY_CREATE_REVIEW_FAIL reducer
    }
  }

export const getUserDiary = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_DIARY_REQUEST })

    const {
      userLogin: { userInfo }, // we are destructuring two levels i.e getState().userLogin.userInfo
      userLoginGoogle: { userGoogle }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${
          (userGoogle && userGoogle.token) || (userInfo && userInfo.token)
        }`
      }
    }

    const userId = `${
      (userGoogle && userGoogle._id) || (userInfo && userInfo._id)
    }`

    const { data } = await axios.get(
      `https://diary-liv9.onrender.com/api/diary/${
        user ? user.userId : userId
      }/user`,
      config
    )

    dispatch({
      type: GET_USER_DIARY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_USER_DIARY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
