import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiaryById } from "../actions/diaryActions";

const DiaryScreen = ({ match }) => {
  const DiaryId = match.params.id;
  const dispatch = useDispatch();

  // const diaryListById = useSelector((state) => state.diaryListById);
  // const { loading, success, error, diary } = diaryListById;

  // useEffect(() => {
  //   dispatch(getDiaryById(DiaryId));
  // }, [DiaryId, dispatch]);

  return (
    <div>
      <h1>{DiaryId}</h1>
    </div>
  );
};

export default DiaryScreen;
