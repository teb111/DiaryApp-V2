import express, { Router } from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  createDiary,
  editDiary,
  getDiaries,
  getDiaryById,
} from "../controller/diaryController.js";

router.route("/").post(protect, createDiary).get(getDiaries);

router.route("/:id").put(protect, editDiary).get(protect, getDiaryById);

export default router;
