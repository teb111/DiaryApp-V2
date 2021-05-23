import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"; // to handle any unHandled promise rejection warnings
import User from "../models/userModel.js";

const protect = asyncHandler((req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  }
});

export { token };
