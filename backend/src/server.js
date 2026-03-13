import dotenv from "dotenv";
dotenv.config();

import dbConnection from "./db/db.js";
import logger from "./utils/logger.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

//Handling uncaught exceptions globally
process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION 💥", err);
  process.exit(1); //let PM2 restart the app
});

//connecting to the database
dbConnection();

//Starting the server
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

//Handling unhandled promise rejections globally
process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION 💥", err);
  //shutting down the server gracefully
  server.close(() => process.exit(1)); //let PM2 restart the app "process.exit(1)"
});
