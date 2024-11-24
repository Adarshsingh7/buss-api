import { Router } from "express";
import {
  createRoutes,
  deleteRoutes,
  getAllRoutes,
  getRoutes,
  updateRoutes,
} from "../controllers/routes.controller";
import { protect } from "../controllers/auth.controller";
import { attachUser } from "../controllers/handlerFactory";

const router = Router();

router.use(protect);

router.route("/").get(getAllRoutes).post(attachUser, createRoutes);
router.route("/:id").get(getRoutes).patch(updateRoutes).delete(deleteRoutes);

export default router;
