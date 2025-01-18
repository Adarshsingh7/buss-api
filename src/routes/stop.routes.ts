import { Router } from "express";
import {
  createStop,
  deleteStop,
  disableActiveStatus,
  getAllStop,
  getStop,
  updateStop,
} from "../controllers/stops.controller";
import { protect } from "../controllers/auth.controller";
import { attachUser } from "../controllers/handlerFactory";

const router = Router();

router.use(protect);
router.route("/disable-status").post(disableActiveStatus);
router.route("/").get(getAllStop).post(attachUser, createStop);
router.route("/:id").get(getStop).patch(updateStop).delete(deleteStop);

export default router;
