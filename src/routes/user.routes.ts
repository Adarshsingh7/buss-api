import User from "models/user.model";
import {
  forgotPassword,
  protect,
  signin,
  signup,
  updatePassword,
} from "../controllers/auth.controller";
import { Request, Response, Router } from "express";

const testRes = (req: Request, res: Response) => {
  res.status(200).json({ message: "Protected route" });
};

const router = Router();
router.route("/signup").post(signup);
router.route("/login").post(signin);
router.post("/forgetPassword", forgotPassword);
router.post("/updatePassword", updatePassword);
export default router;
