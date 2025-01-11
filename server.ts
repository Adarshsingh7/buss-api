import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });
import app from "./src/app";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log({ name: err.name, message: err.message, err });
  process.exit(1);
});

const port = process.env.PORT || 8080;

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("New connection!");
  socket.on("user-message", (message) => {
    console.log(message);
    io.emit("user-message", message);
  });
});

mongoose
  .connect(process.env.DATABASE_REMOTE as string)
  .then(() => console.info("DB connection successful!"))
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.info(`App running peacefully on port ${port}...`);
});

process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message, err);
  server.close(() => {
    process.exit(1);
  });
});
