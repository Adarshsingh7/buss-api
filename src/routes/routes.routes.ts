import { Router } from "express";
import {
  createRoutes,
  deleteRoutes,
  getAllRoutes,
  getRoutes,
  updateRoutes,
} from "../controllers/routes.controller";

const router = Router();

router.route("/").get(getAllRoutes).post(createRoutes);
router.route("/:id").get(getRoutes).patch(updateRoutes).delete(deleteRoutes);

export default router;
