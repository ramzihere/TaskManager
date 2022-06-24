import CustomError from "../classes/Error.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ status: "error", message: err.message });
  }
  return res.status(500).json({ status: "error", message: err });
};

export default errorHandler;
