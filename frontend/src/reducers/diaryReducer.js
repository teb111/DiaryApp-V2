import {
  CREATE_DIARY_REQUEST,
  CREATE_DIARY_SUCCESS,
  CREATE_DIARY_FAIL,
  CREATE_DIARY_RESET,
  DIARY_LIST_REQUEST,
  DIARY_LIST_SUCCESS,
  DIARY_LIST_FAIL,
} from "../constants/diaryConstant.js";

export const createDiaryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_DIARY_REQUEST:
      return { loading: true };
    case CREATE_DIARY_SUCCESS:
      return { loading: false, success: true, diary: action.payload };
    case CREATE_DIARY_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_DIARY_RESET:
      return {};
    default:
      return state;
  }
};

export const diaryListReducer = (state = { diaries: [] }, action) => {
  switch (action.type) {
    case DIARY_LIST_REQUEST:
      return { loading: true };
    case DIARY_LIST_SUCCESS:
      return { loading: false, success: true, diaries: action.payload };
    case DIARY_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
