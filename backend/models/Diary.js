import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // refrencing the user model here
    }, // associating a user with the comment
  },
  {
    timestamps: true,
  }
);

const DiarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    readTime: {
      type: String,
      required: true,
    },
    comment: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

const Diary = mongoose.model("Diary", DiarySchema);

DiarySchema.pre("save", async function (next) {});

export default Diary;
