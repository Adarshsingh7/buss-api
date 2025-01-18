import { Request, Response, NextFunction } from "express";
import Stop from "../models/stop.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory";
import routesModel from "../models/routes.model";
import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

export const disableActiveStatus = catchAsync(async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const routeId = req.query["route-id"];
  if (!routeId) return next(new AppError("please provide a route id", 400));
  const route = await routesModel.findById(routeId);
  if (!route) return next(new AppError("No route found with this id", 404));
  const stops = route.stops;
  if (!stops) return next(new AppError("No stops found with this route", 404));

  await Stop.updateMany(
    { _id: { $in: stops } },
    { arrivalStatus: "waiting" },
    { multi: true },
  );

  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const createStop = createOne(Stop);
export const getStop = getOne(Stop);
export const getAllStop = getAll(Stop);
export const updateStop = updateOne(Stop);
export const deleteStop = deleteOne(Stop);
