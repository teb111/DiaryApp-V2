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
      trim: false,
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
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    author: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    authorlink: {
      type: String,
      required: true,
    },
    comment: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

DiarySchema.methods.setReadTime = async function (diaryBody) {
  const body = diaryBody;
  const avgWordsPerMin = 250;

  const getWordCount = () => {
    return body.match(/\w+/g).length;
  };
  const setReadingTime = () => {
    let count = getWordCount();
    let time = Math.ceil(count / avgWordsPerMin);

    return (this.readTime = `${time} min read`);
  };
  await setReadingTime();
};

DiarySchema.pre("save", async function (next) {
  if (!this.isModified("body")) {
    next();
  }
});

const Diary = mongoose.model("Diary", DiarySchema);

export default Diary;
