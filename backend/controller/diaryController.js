import asyncHandler from "express-async-handler";
import Diary from "../models/Diary.js";

// create a product
// route POST /api/diary
//access public

const createDiary = asyncHandler(async (req, res) => {
  try {
    const { title, body, image, isPublic } = req.body;
    const user = req.user._id;
    const diary = new Diary({
      title,
      body,
      image,
      isPublic,
      user,
    });

    const createdDiary = await diary.save();
    res.status(201).json(createdDiary);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get all products
// route GET /api/diary
//access public

const getDiaries = asyncHandler(async (req, res) => {
  const diaries = await Diary.find({ isPublic: true }).populate(
    "user",
    "name email"
  );
  res.json(diaries);
});

export { createDiary, getDiaries };
