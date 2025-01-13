import { Router } from "express";
import {
  createLocation,
  deleteLocation,
  getAllLocation,
  getLocation,
  updateLocation,
  getDerivedLocation,
} from "../controllers/location.controller";

const router = Router();

router.get("/getLocation", getDerivedLocation);
router.route("/").get(getAllLocation).post(createLocation);
router
  .route("/:id")
  .get(getLocation)
  .patch(updateLocation)
  .delete(deleteLocation);

export default router;
