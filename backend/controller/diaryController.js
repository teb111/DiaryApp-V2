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

// Get all diaries
// route GET /api/diary
//access public

const getDiaries = asyncHandler(async (req, res) => {
  // Getting the products
  const pageSize = 10;
  console.log(req.query.pageNumber);
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i", // case insensitive
        },
      }
    : {};
  const countDiaries = await Diary.countDocuments({ ...keyword });
  const diaries = await Diary.find({ ...keyword, isPublic: true })
    .populate("user", "name email image")
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
  const diary = await Diary.findById({ _id: req.params.id }).populate(
    "user",
    "name email _id"
  );
  if (diary) {
    res.json(diary);
  } else {
    res.status(404);
    res.json({
      message: "Diary Not Found, Please Refresh the Page",
    });
    throw new Error("Diary Not Found");
  }
});

// @desc Create a comment
// @route POST /api/diary/:id/reviews
// @access Private
const createComment = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const diary = await Diary.findById(req.params.id);

  if (diary) {
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    diary.comment.push(review);

    diary.numReviews = diary.comment.length;

    diary.rating =
      diary.comment.reduce((acc, item) => item.rating + acc, 0) /
      diary.comment.length;

    await diary.save();
    res.status(201).json({ message: "Review created" });
  } else {
    res.status(404);
    res.json({
      message: "An Error Occured, Please fill the boxes below and try again",
    });
    throw new Error("Diary not found");
  }
});

// Get top rated diaries
// route GET /api/diary/toprated
//access public

const getUserDiaries = asyncHandler(async (req, res) => {
  // Getting diaries related to user

  const diaries = await Diary.find({
    user: req.params.id,
  }).populate("user", "name email");

  res.json(diaries);
});

export {
  createDiary,
  editDiary,
  getDiaries,
  getDiaryById,
  createComment,
  getUserDiaries,
};
