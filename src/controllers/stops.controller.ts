import Stop from "../models/stop.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory";

export const createStop = createOne(Stop);
export const getStop = getOne(Stop);
export const getAllStop = getAll(Stop);
export const updateStop = updateOne(Stop);
export const deleteStop = deleteOne(Stop);
