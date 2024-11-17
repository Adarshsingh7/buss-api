import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

import userRouter from "./routes/user.routes";
import routesRouter from "./routes/routes.routes";
import stopRouter from "./routes/stop.routes";
import globalErrorHandler from "./controllers/error.controller";

import cors from "cors";
import { UserType } from "../types/type";
import AppError from "./utils/appError";

declare global {
  namespace Express {
    interface Request {
      requestTime?: string;
      user?: UserType;
    }
  }
}

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "data:", "blob:", "https:", "ws:"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", "https:", "data:"],
        scriptSrc: [
          "'self'",
          "https:",
          "http:",
          "blob:",
          "https://*.mapbox.com",
          "https://js.stripe.com",
          "https://m.stripe.network",
          "https://*.cloudflare.com",
        ],
        frameSrc: ["'self'", "https://js.stripe.com"],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        workerSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://*.tiles.mapbox.com",
          "https://api.mapbox.com",
          "https://events.mapbox.com",
          "https://m.stripe.network",
        ],
        childSrc: ["'self'", "blob:"],
        imgSrc: ["'self'", "data:", "blob:"],
        formAction: ["'self'"],
        connectSrc: [
          "'self'",
          "'unsafe-inline'",
          "data:",
          "blob:",
          "https://*.stripe.com",
          "https://*.mapbox.com",
          "https://*.cloudflare.com/",
          "https://bundle.js:*",
          "ws://127.0.0.1:*/",
        ],
        upgradeInsecureRequests: [],
      },
    },
  }),
);
app.use(cors());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 1000, // for 1 hour user can send only 100 requests
  message: "Too many requests from this IP, please try again after a minute",
});

app.use("/api", limiter);

// for getting the query string in formatted form
app.use(express.json({ limit: "5kb" }));

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("This is working fine");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/stop", stopRouter);
app.use("/api/v1/routes", routesRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
