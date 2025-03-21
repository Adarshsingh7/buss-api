import User from "models/user.model";
import {
  forgotPassword,
  getMe,
  protect,
  restrictTo,
  signin,
  signup,
  updatePassword,
} from "../controllers/auth.controller";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/user.controller";
import { Request, Response, Router } from "express";

const testRes = (req: Request, res: Response) => {
  res.status(200).json({ message: "Protected route" });
};

const router = Router();
router.route("/signup").post(signup);
router.route("/login").post(signin);
router.post("/forgetPassword", forgotPassword);
router.post("/updatePassword", updatePassword);
router.get("/me", protect, getMe);

router.use(protect, restrictTo(["admin", "super-admin"]));

router.route("/").get(getAllUser).post(createUser).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
