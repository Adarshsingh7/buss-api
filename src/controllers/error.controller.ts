import AppError from "./../utils/appError";

interface Error {
  path?: string;
  value?: string;
  errmsg?: string;
  errors?: { [key: string]: { message: string } };
  name?: string;
  code?: number;
  statusCode?: number;
  status?: string;
  message?: string;
  isOperational?: boolean;
  stack?: string;
}

const handleCastErrorDB = (err: Error): AppError => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: Error): AppError => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: Error): AppError => {
  const errors = Object.values(err.errors || {}).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = (err: Error): AppError => {
  return new AppError("you are unauthorized, please log in again", 401);
};

const handleTokenExpire = (): AppError =>
  new AppError("session expired log in again ", 401);

const sendErrorProd = (err: Error, req: any, res: any): void => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      error: err,
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  } else {
    console.error("ERROR 💥", err);

    res.status(500).json({
      status: "error",
      error: err,
      message: "Something went very wrong!",
    });
  }
};

export default (err: Error, req: any, res: any, next: any): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = Object.assign({}, err);
  error.message = err.message;

  if (err.name === "CastError") error = handleCastErrorDB(err);
  if (err.code === 11000) error = handleDuplicateFieldsDB(err);
  if (err.name === "ValidationError") error = handleValidationErrorDB(err);
  if (err.name === "JsonWebTokenError") error = handleJWTError(err);
  if (err.name === "TokenExpiredError") error = handleTokenExpire();
  else if (err?.message) {
    error = new AppError(err.message, 400);
  }

  sendErrorProd(error, req, res);
};
