import User from "../models/user.js";
import {
  asyncWrapper,
  hashPassword,
  comparePassword,
  generateJwt,
  createCustomError,
} from "../lib/helpers.js";

const register = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return next(createCustomError(`Email and password are required`, 401));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(createCustomError(`Email already exists`, 400));
  } else {
    const hashedPassword = await hashPassword(password);
    user = await User.create({
      email,
      password: hashedPassword,
    });

    const token = generateJwt(user._id);
    user.token = token;
    await user.save();

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      user,
    });
  }
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return next(createCustomError("Email and password are required", 401));
  }
  let user = await User.findOne({ email });

  if (user) {
    const isCompared = await comparePassword(password, user.password);
    if (isCompared) {
      const token = generateJwt(user._id);
      user.token = token;
      await user.save();
      return res.status(200).json({
        status: "success",
        message: "User logged in successfully",
        user,
      });
    } else {
      return next(createCustomError("Invalid password", 401));
    }
  } else {
    return next(createCustomError("User does not exist", 401));
  }
});

export { register, login };
