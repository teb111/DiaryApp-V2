import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  createBookmark,
  getBookmarks,
  editUser,
  getUserDetails,
} from "../controller/userController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).put(protect, editUser);
router.route("/login").post(loginUser);
router.route("/:id/bookmarks").post(protect, createBookmark).get(getBookmarks);
router.route("/:id").get(protect, getUserDetails);

export default router;
