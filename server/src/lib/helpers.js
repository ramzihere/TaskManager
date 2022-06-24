import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import CustomError from "../classes/Error.js";

const asyncWrapper = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

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

const createCustomError = (message, statusCode) => {
  return new CustomError(message, statusCode);
};

export {
  asyncWrapper,
  hashPassword,
  comparePassword,
  generateJwt,
  createCustomError,
};
