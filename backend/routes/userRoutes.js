import express, { Router } from "express";
import { registerUser, loginUser } from "../controller/userController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.route("/login").post(loginUser);

export default router;
