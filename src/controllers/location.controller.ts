import { Request, Response, NextFunction } from "express";
import Location from "../models/location.model";
import AppError from "../utils/appError";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory";
import { catchAsync } from "../utils/catchAsync";
import routesModel from "../models/routes.model";

export const createLocation = createOne(Location);
export const getLocation = getOne(Location);
export const getAllLocation = getAll(Location);
export const updateLocation = updateOne(Location);
export const deleteLocation = deleteOne(Location);

export const getDerivedLocation = catchAsync(
  async (
    req: Request<{}, {}, { user: string; route: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const user = req.body.user;
    const route = req.body.route;

    if (!user && !route) {
      return next(new AppError("There must be a user in the body", 400));
    }
    if (route) {
      const location = await Location.findOne({ route: route });
      if (!location)
        return next(new AppError(`Location with ${route} not found`, 404));

      res.status(200).json({ status: "success", data: location });
    } else {
      const location = await Location.findOne({ user: user });
      if (!location)
        return next(new AppError(`Location with ${user} not found`, 404));

      res.status(200).json({ status: "success", data: location });
    }
  },
);
