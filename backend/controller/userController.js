import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import Diary from "../models/Diary.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  "247079180053-gjglmnlaevngo30bgmibj4olgdhv22qm.apps.googleusercontent.com"
);

// @desc     Register a new User
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;

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
    image,
  });

  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      image: user.image,
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
            bio: userExists.bio,
            linkedIn: userExists.linkedIn,
            twitter: userExists.twitter,
            instagram: userExists.instagram,
            image: userExists.image,
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
      bio: user.bio,
      image: user.image,
      linkedIn: user.linkedIn,
      twitter: user.twitter,
      instagram: user.instagram,
      token: generateToken(user._id), // generating a token alongside the user's id
    });
  } else {
    res.status(401).json({ message: "Invalid Email or password" });
  }
});

// Edit User
// route PUT /api/user/:id
//access private

const editUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { name, email, bio, linkedIn, twitter, instagram, image } = req.body;
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.linkedIn = linkedIn || user.linkedIn;
    user.twitter = twitter || user.twitter;
    user.instagram = instagram || user.instagram;
    user.image = image || user.image;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      bio: updatedUser.bio,
      linkedIn: updatedUser.linkedIn,
      twitter: updatedUser.twitter,
      instagram: updatedUser.instagram,
      image: updatedUser.image,
      token: generateToken(updatedUser._id),
    });
  }
});

// Create Bookmarks
// route POST /api/user/:id/bookmark
//access private

const createBookmark = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const userId = req.params.id;
  const user = await User.findById(req.params.id);

  if (user) {
    const bookmark = {
      diary: id,
    };

    const alreadyBookmarked = user.bookmarks.find(
      (r) => r.diary.toString() === id.toString()
    );

    if (alreadyBookmarked) {
      deleteBookmark(userId, user, alreadyBookmarked);
      res.status(200).json({ message: "Boomarked removed" });
    } else {
      user.bookmarks.push(bookmark);
      await user.save();

      res.status(201).json({ message: "Post Bookmarked" });
    }
  } else {
    res.status(500).res.json({ message: "An Error Occured, Please Try Again" });
    throw new Error("Post was not bookmarked");
  }
});

// Delete bookmark
// route Create Bookmark calls it
// access private

const deleteBookmark = asyncHandler(
  async (userId, user, alreadyBookmarked, req, res) => {
    try {
      const getBookmarkbyId = await User.updateOne(
        { _id: userId },
        { $pull: { bookmarks: { _id: alreadyBookmarked._id } } }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

// Get Bookmarks
// route GET /api/user/:id/bookmark
//access private

const getBookmarks = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const bookmarks = user.bookmarks.map((book) => {
      return book.diary.toString();
    });

    let books = [];

    const diaries = bookmarks.forEach(function (book) {
      books.push(mongoose.Types.ObjectId(String(book)));
    });

    const bookmark = await Diary.find(
      {
        _id: {
          $in: books,
        },
      },
      function (err, docs) {
        if (err) {
          res.status(404).res.json({
            message:
              "An Error Occured while trying to bookmark this post, Please Try Again",
          });
        }
      }
    ).populate("user name email");
    res.json(bookmark);
  } else {
    res.status(500).res.json({
      message: "An Error Occured, Please Log in Again",
    });
    throw new Error("User not found");
  }
});

const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      image: user.image,
      linkedIn: user.linkedIn,
      twitter: user.twitter,
      instagram: user.instagram,
    });
  } else {
    console.log("An error occured");
  }
});

export {
  registerUser,
  loginWithGoogle,
  loginUser,
  editUser,
  createBookmark,
  getBookmarks,
  getUserDetails,
};
