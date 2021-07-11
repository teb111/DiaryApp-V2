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
