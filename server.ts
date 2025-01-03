import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });
import { Server } from "http";
import app from "./src/app";
import mongoose from "mongoose";

process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log({ name: err.name, message: err.message, err });
  process.exit(1);
});

console.log("Environment Variables:", process.env.PORT);
const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.DATABASE_REMOTE as string)
  .then(() => console.info("DB connection successful!"))
  .catch((err) => console.error(err));

const server: Server = app.listen(port, () => {
  console.info(`App running peacefully on port ${port}...`);
});

process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message, err);
  server.close(() => {
    process.exit(1);
  });
});
