import Location from "../models/location.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory";

export const createLocation = createOne(Location);
export const getLocation = getOne(Location);
export const getAllLocation = getAll(Location);
export const updateLocation = updateOne(Location);
export const deleteLocation = deleteOne(Location);
