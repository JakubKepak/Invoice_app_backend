import jwt from "jsonwebtoken";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

export const getToken = ({ _id, username, email }) => {
  return jwt.sign({ _id, username, email }, process.env.SECRET, {
    expiresIn: "1d",
  });
};
