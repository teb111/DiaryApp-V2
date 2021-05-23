import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import connectDB from "./config/db.js";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";

//load config
dotenv.config({});

//passport config
import("./config/passport.js");

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("This is working");
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//passport middleware\
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/google", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App running on port 5000`));
