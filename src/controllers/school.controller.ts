import School from "../models/school.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory";

export const createSchool = createOne(School);
export const deleteSchool = deleteOne(School);
export const getAllSchools = getAll(School);
export const getSchool = getOne(School);
export const updateSchool = updateOne(School);
