import express, { Router } from "express";
import { registerUser } from "../controller/userController";
const router = express.Router();
import { authMiddleware } from "../middleware/authMiddleware";

router.route("/").post(registerUser);
