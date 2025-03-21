import { protect, restrictTo } from "../controllers/auth.controller";
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

router.route("/:id").get(getSchool).patch(updateSchool);

// router.use(restrictTo(["super-admin"]));

router.route("/:id").delete(deleteSchool);
router.route("/").get(getAllSchools).post(createSchool);

export default router;
