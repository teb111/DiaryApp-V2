const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // these are the fields we are going to get back if the user authenticate with google
    googleId: {
      type: String,
    },
    displayName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
    // this will create fields like "createdAt" automatically
  }
);

// so this function here  will run before we save anything to our database , basically we are just hashing our password with bcrypt
userSchema.pre("save", async function (next) {
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
