import { Router } from "express";
import {
  createLocation,
  deleteLocation,
  getAllLocation,
  getLocation,
  updateLocation,
} from "../controllers/location.controller";

const router = Router();

router.route("/").get(getAllLocation).post(createLocation);
router
  .route("/:id")
  .get(getLocation)
  .patch(updateLocation)
  .delete(deleteLocation);

export default router;
