import Routes from "../models/routes.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory";

export const createRoutes = createOne(Routes);
export const getRoutes = getOne(Routes);
export const getAllRoutes = getAll(Routes);
export const updateRoutes = updateOne(Routes);
export const deleteRoutes = deleteOne(Routes);
