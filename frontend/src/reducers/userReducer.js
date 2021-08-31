import {
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
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
  CREATE_BOOKMARK_REQUEST,
  CREATE_BOOKMARK_SUCCESS,
  CREATE_BOOKMARK_FAIL,
  CREATE_BOOKMARK_RESET,
  GET_BOOKMARK_REQUEST,
  GET_BOOKMARK_SUCCESS,
  GET_BOOKMARK_FAIL,
  GET_BOOKMARK_RESET,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAIL,
} from "../constants/userConstant";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, state: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userLoginGoogleReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_GOOGLE_REQUEST:
      return { loading: true };
    case USER_LOGIN_GOOGLE_SUCCESS:
      return { loading: false, userGoogle: action.payload };
    case USER_LOGIN_GOOGLE_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT_GOOGLE:
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST:
      return { loading: true };
    case PASSWORD_RESET_SUCCESS:
      return { loading: false, passwordReset: action.payload };
    case PASSWORD_RESET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const diaryBookmarkReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BOOKMARK_REQUEST:
      return { loading: true };

    case CREATE_BOOKMARK_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case CREATE_BOOKMARK_FAIL:
      return { loading: false, error: action.payload };

    case CREATE_BOOKMARK_RESET:
      return {};
    default:
      return state;
  }
};

export const getBookmarkReducer = (state = { bookmarks: [] }, action) => {
  switch (action.type) {
    case GET_BOOKMARK_REQUEST:
      return { loading: true };

    case GET_BOOKMARK_SUCCESS:
      return { loading: false, success: true, bookmarks: action.payload };

    case GET_BOOKMARK_FAIL:
      return { loading: false, error: action.payload };

    case GET_BOOKMARK_RESET:
      return { bookmarks: [] };

    default:
      return state;
  }
};

export const edituserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { loading: true };
    case USER_EDIT_SUCCESS:
      return { loading: false, success: true, state: action.payload };
    case USER_EDIT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getUserDetailReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USER_DETAILS_REQUEST:
      return { loading: true };
    case GET_USER_DETAILS_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case GET_USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
