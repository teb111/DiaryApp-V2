import express from "express";
import passport from "passport";

const router = express.Router();

// @desc authenticate with google
// @route  GET /auth/google
// passport.authenticate we are using our google strategy which we created in our passport.js file
router.get("/", passport.authenticate("google", { scope: ["profile"] }));

// Description-- Google auth callback
// Route == GET /auth/google/callback

// so the failureredirect simply means if somethings fails take us back to the login page
// else if it succeds take us back to the login page
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

export default router;
