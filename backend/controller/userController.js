import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  "247079180053-gjglmnlaevngo30bgmibj4olgdhv22qm.apps.googleusercontent.com"
);

// @desc     Register a new User
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // cheecking if the user already exists in the database
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // if not we go ahead and create the new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // generating a token alongside the user's id
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginWithGoogle = asyncHandler((req, res) => {
  const { tokenId } = req.body;

  // verifying if the token from the client and the backend is the same

  const verified = async () => {
    const result = await client.verifyIdToken({
      idToken: tokenId,
      audience:
        "247079180053-gjglmnlaevngo30bgmibj4olgdhv22qm.apps.googleusercontent.com",
    });

    const { email_verified, name, email } = result.payload;

    if (email_verified) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        try {
          res.status(200);
          res.json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            token: generateToken(userExists._id), // generating a token alongside the user's id
          });
        } catch (err) {
          res.status(400);
          throw new Error("User not found");
        }
      } else {
        const password = `${email}${process.env.JWT_SECRET}`;
        const user = await User.create({
          name,
          email,
          password,
        });

        if (user) {
          res.status(201);
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id), // generating a token alongside the user's id
          });
        } else {
          res.status(400);
          throw new Error("Sorry, Something Went Wrong");
        }
      }
    }
  };

  verified();
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // checking to see if the password the user entered correlates with the one in the database with our method from userModel
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // generating a token alongside the user's id
    });
  } else {
    res.status(401).json({ message: "Invalid Email or password" });
  }
});

export { registerUser, loginWithGoogle, loginUser };
