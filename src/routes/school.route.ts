import { protect } from "../controllers/auth.controller";
import {
  createSchool,
  deleteSchool,
  getAllSchools,
  getSchool,
  updateSchool,
} from "../controllers/school.controller";
import { Router } from "express";

const router = Router();

router.use(protect);
router.route("/").get(getAllSchools).post(createSchool);
router.route("/:id").get(getSchool).patch(updateSchool).delete(deleteSchool);

export default router;
