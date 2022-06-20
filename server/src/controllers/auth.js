import User from "../models/user.js";
import {
  hashPassword,
  comparePassword,
  updateJwtToken,
} from "../lib/helpers.js";

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!(email && password)) {
      return res
        .status(401)
        .json({ status: "error", message: "Email and password are required" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    } else {
      const hashedPassword = await hashPassword(password);
      user = await User.create({
        email,
        password: hashedPassword,
      });

      user = await updateJwtToken(user._id);

      return res.status(201).json({
        status: "success",
        message: "User registered successfully",
        user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!(email && password)) {
      return res
        .status(401)
        .json({ status: "error", message: "Email and password are required" });
    }
    let user = await User.findOne({ email });

    if (user) {
      const isCompared = await comparePassword(password, user.password);
      if (isCompared) {
        user = await updateJwtToken(user._id);
        return res.status(200).json({
          status: "success",
          message: "User logged in successfully",
          user,
        });
      } else {
        return res.status(401).json({
          status: "error",
          message: "Invalid password",
        });
      }
    } else {
      return res
        .status(401)
        .json({ status: "error", message: "User does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

export { register, login };
