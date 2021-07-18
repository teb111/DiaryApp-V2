import express, { Router } from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { createDiary, getDiaries } from "../controller/diaryController.js";

router.route("/").post(protect, createDiary).get(getDiaries);

export default router;
