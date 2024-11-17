import User from "./../models/user.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory";

export const createUser = createOne(User);
export const getUser = getOne(User);
export const getAllUser = getAll(User);
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
