import { Router } from "express";
import {
  createStop,
  deleteStop,
  getAllStop,
  getStop,
  updateStop,
} from "../controllers/stops.controller";

const router = Router();

router.route("/").get(getAllStop).post(createStop);
router.route("/:id").get(getStop).patch(updateStop).delete(deleteStop);

export default router;
