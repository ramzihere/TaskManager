import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

const comparePassword = async (password, userPassword) => {
  try {
    const isCompared = await bcrypt.compare(password, userPassword);
    return isCompared;
  } catch (error) {
    throw error;
  }
};

const generateJwt = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

const updateJwtToken = async (userId) => {
  try {
    const token = generateJwt();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        token,
      },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export { hashPassword, comparePassword, updateJwtToken };
