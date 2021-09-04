import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import diaryRoutes from "./routes/diaryRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

//load config
dotenv.config({});

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// routes
app.use("/auth/google", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/diary", diaryRoutes);
app.use("/api/uploads", uploadRoutes);

// images
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("This is working");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App running on port 5000`));
