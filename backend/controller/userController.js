import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

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

  export {registerUser}