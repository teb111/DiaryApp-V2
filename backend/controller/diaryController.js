import asyncHandler from "express-async-handler";
import Diary from "../models/Diary.js";
import paginate from "jw-paginate";

// create a diary
// route POST /api/diary
//access public

const createDiary = asyncHandler(async (req, res) => {
  try {
    const diary = new Diary({
      title: "New Title",
      body: "Body Goes in here",
      image: "/uploads/sample.jpg",
      isPublic: true,
      readTime: "3 min read",
      user: req.user._id,
    });

    const createdDiary = await diary.save();

    res.status(201).json(createdDiary);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Edit a diary
//route POST /api/diary/:id
//access public

const editDiary = asyncHandler(async (req, res) => {
  try {
    const { title, body, image, isPublic } = req.body;

    const diary = await Diary.findById(req.params.id);

    if (diary) {
      console.log("code got here");
      (diary.title = title),
        (diary.body = body),
        (diary.image = image),
        (diary.isPublic = isPublic);
      await diary.setReadTime(body);
      const updatedDiary = await diary.save();
      res.json(updatedDiary);
      console.log(updatedDiary);
    } else {
      console.log("An error Occured");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get all products
// route GET /api/diary
//access public

const getDiaries = asyncHandler(async (req, res) => {
  // Getting the products
  const pageSize = 4;
  console.log(req.query.pageNumber);
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        body: {
          $regex: req.query.keyword,
          $options: "i", // case insensitive
        },
      }
    : {};
  const countDiaries = await Diary.countDocuments({ ...keyword });
  const diaries = await Diary.find({ ...keyword, isPublic: true })
    .populate("user", "name email")
    .limit(pageSize) // limiting it by the pageSize if the pageSize is 2, it's only going to get 2 products
    // to get  the correct product
    .skip(pageSize * (page - 1));

  const pager = paginate(Number(countDiaries), page, pageSize);

  // get page of items from items array
  const pageOfItems = diaries.slice(pager.startIndex, pager.endIndex + 1);

  res.json({
    countDiaries,
    diaries,
    page,
    pages: Math.ceil(countDiaries / pageSize),
    pageSize,
    pager,
    pageOfItems,
  });

  const deleteDiaries = await Diary.deleteMany({ title: "New Title" });
});

const getDiaryById = asyncHandler(async (req, res) => {
  const diary = await Diary.findById({ _id: req.params.id });
  if (diary) {
    res.json(diary);
  } else {
    res.status(404);
    throw new Error("Diary Not Found");
  }
});

export { createDiary, editDiary, getDiaries, getDiaryById };
