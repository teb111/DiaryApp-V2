import {
  CREATE_DIARY_REQUEST,
  CREATE_DIARY_SUCCESS,
  CREATE_DIARY_FAIL,
  CREATE_DIARY_RESET,
  DIARY_LIST_REQUEST,
  DIARY_LIST_SUCCESS,
  DIARY_LIST_FAIL,
  DIARY_UPDATE_REQUEST,
  DIARY_UPDATE_SUCCESS,
  DIARY_UPDATE_FAIL,
  DIARY_UPDATE_RESET,
  DIARY_LIST_ID_REQUEST,
  DIARY_LIST_ID_SUCCESS,
  DIARY_LIST_ID_FAIL,
  DIARY_LIST_ID_RESET,
  DIARY_LIST_RESET,
  DIARY_CREATE_REVIEW_REQUEST,
  DIARY_CREATE_REVIEW_SUCCESS,
  DIARY_CREATE_REVIEW_FAIL,
  DIARY_CREATE_REVIEW_RESET,
  GET_USER_DIARY_REQUEST,
  GET_USER_DIARY_SUCCESS,
  GET_USER_DIARY_FAIL,
  GET_USER_DIARY_RESET,
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

export const updateDiaryReducer = (state = { diary: {} }, action) => {
  switch (action.type) {
    case DIARY_UPDATE_REQUEST:
      return { loading: true };
    case DIARY_UPDATE_SUCCESS:
      return { loading: false, success: true, diary: action.payload };
    case DIARY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DIARY_UPDATE_RESET:
      return { diary: {} };
    default:
      return state;
  }
};

export const diaryListByIdReducer = (state = { diary: {} }, action) => {
  switch (action.type) {
    case DIARY_LIST_ID_REQUEST:
      return { loading: true };
    case DIARY_LIST_ID_SUCCESS:
      return { loading: false, success: true, diary: action.payload };
    case DIARY_LIST_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const diaryListReducer = (state = { diaries: [] }, action) => {
  switch (action.type) {
    case DIARY_LIST_REQUEST:
      return { loading: true };
    case DIARY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        diaries: action.payload.diaries,
        countDiaries: action.payload.countDiaries,
        page: action.payload.page,
        pages: action.payload.pages,
        pagesSize: action.payload.pageSize,
        pager: action.payload.pager,
        pageOfItems: action.payload.pageOfItems,
      };
    case DIARY_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DIARY_LIST_RESET:
      return { diaries: [] };
    default:
      return state;
  }
};

export const diaryCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DIARY_CREATE_REVIEW_REQUEST:
      return { loading: true };

    case DIARY_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case DIARY_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    case DIARY_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const getUserDiaryReducer = (state = { diaries: [] }, action) => {
  switch (action.type) {
    case GET_USER_DIARY_REQUEST:
      return { loading: true };
    case GET_USER_DIARY_SUCCESS:
      return { loading: false, success: true, diaries: action.payload };
    case GET_USER_DIARY_FAIL:
      return { loading: false, error: action.payload };
    case GET_USER_DIARY_RESET:
      return { diaries: [] };
    default:
      return state;
  }
};
