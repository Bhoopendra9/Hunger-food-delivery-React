import express from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("../swagger-output.json");

import logger from "./utils/logger.js";
import corsConfiguration from "./utils/cors.config.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsConfiguration);

// Morgan stream → Winston
const morganStream = {
  write: (message) => {
    logger.info(message.trim());
  }
};
// HTTP request logging
app.use(morgan("combined", { stream: morganStream }));

// Importing routes
import userRoutes from "./routes/user.Route.js";

// routes declaration 
app.use("/api/v1/users", userRoutes);

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
