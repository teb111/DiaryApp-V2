import express from "express";
import passport from "passport";

const router = express.Router();

import { loginWithGoogle } from "../controller/userController.js";

// @desc Login with google
// @route  POST /auth/google
router.post("/", loginWithGoogle);

export default router;
