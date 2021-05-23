import {
  USER_LOGIN_GOOGLE_FAIL,
  USER_LOGIN_GOOGLE_REQUEST,
  USER_LOGIN_GOOGLE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstant";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, state: action.payload };
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
      return { loading: false, state: action.payload };
    case USER_LOGIN_GOOGLE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
