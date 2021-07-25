import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginGoogleReducer,
  userRegisterReducer,
  userLoginReducer,
} from "./reducers/userReducer";
import {
  createDiaryReducer,
  diaryListByIdReducer,
  diaryListReducer,
  updateDiaryReducer,
} from "./reducers/diaryReducer";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLoginGoogle: userLoginGoogleReducer,
  userLogin: userLoginReducer,
  diaryCreate: createDiaryReducer,
  diaryList: diaryListReducer,
  diaryUpdate: updateDiaryReducer,
  diaryListById: diaryListByIdReducer,
});

const userInfoGoogleFromStorage = localStorage.getItem("userGoogle")
  ? JSON.parse(localStorage.getItem("userGoogle"))
  : null; // checking if there is any userInfo in the localStorage and Grabbing it

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null; // checking if there is any userInfo in the localStorage and Grabbing it

const initialState = {
  userLoginGoogle: { userGoogle: userInfoGoogleFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
