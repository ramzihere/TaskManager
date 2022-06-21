import jwt from "jsonwebtoken";

import User from "../models/user.js";

const isAuthorized = async (req, res, next) => {
  try {
    if (
      !(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      )
    ) {
      return res
        .status(401)
        .json({ status: "error", message: "No authorization headers exist" });
    } else {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      const user = await User.findOne({ _id: decoded.userId });
      if (!user) {
        return res
          .status(404)
          .json({ status: "error", message: "No user does not exist" });
      }

      next();
    }
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

export { isAuthorized };
