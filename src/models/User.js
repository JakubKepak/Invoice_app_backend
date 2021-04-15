import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  { timestamps: true }
);

export default model("User", userSchema);
