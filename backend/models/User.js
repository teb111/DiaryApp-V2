import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const BookmarkSchema = mongoose.Schema(
  {
    diary: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema = new mongoose.Schema(
  {
    // these are the fields we are going to get back if the user authenticate with google
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    image: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    bookmarks: [BookmarkSchema],
  },
  {
    timestamps: true,
    // this will create fields like "createdAt" automatically
  }
);

// creating a function to compare the user entered password with the one in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// so this function here  will run before we save anything to our database , basically we are just hashing our password with bcrypt
UserSchema.pre("save", async function (next) {
  // this will check if the password field has been modified, if not we do not want to hash the password
  // cause we don't want to hash the password on PUT requests to modify for example the user's name only
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);

export default User;
