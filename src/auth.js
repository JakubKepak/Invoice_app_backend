import jwt from "jsonwebtoken";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

export const getUserFromToken = (token) => {
  try {
    token = token.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET);
    return user;
  } catch (err) {
    return null;
  }
};

export const authenticated = (next) => (root, args, context, info) => {
  if (!context.authUser) throw new Error("not authenticated");
  return next(root, args, context, info);
};
