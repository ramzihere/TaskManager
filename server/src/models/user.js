import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required for register"],
    unique: [true, "Email is already exists"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required for register"],
  },
  token: {
    type: String,
    default: "",
  },
});

export default mongoose.model("User", userSchema);
