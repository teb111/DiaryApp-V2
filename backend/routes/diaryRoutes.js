import express, { Router } from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  createComment,
  createDiary,
  editDiary,
  getDiaries,
  getDiaryById,
  getUserDiaries,
} from "../controller/diaryController.js";

router.route("/").post(protect, createDiary).get(getDiaries);

router.route("/:id").put(protect, editDiary).get(getDiaryById);

router.route("/:id/reviews").post(protect, createComment);
router.route("/:id/user").get(protect, getUserDiaries);

export default router;
