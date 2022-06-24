import express from "express";
import dotenv from "dotenv";

import connectDB from "./src/db/connection.js";
import authRoutes from "./src/routes/auth.js";
import taskRoutes from "./src/routes/task.js";
import { isAuthorized } from "./src/middlewares/auth.js";
import notFound from "./src/middlewares/notFound.js";
import errorHandler from "./src/middlewares/error.js";

// Environment variables config
dotenv.config();

// App instance initialization
const app = express();

// Port initialization
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/task", isAuthorized, taskRoutes);

// middleware
app.use(notFound);
app.use(errorHandler);

// Database initialization and server spining up
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("server is listening on port", PORT);
    });
  } catch (error) {
    console.log("error on connecting database", error);
  }
};

startServer();
