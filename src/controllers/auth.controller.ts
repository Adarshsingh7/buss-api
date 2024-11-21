import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import process from "process";

import User from "./../models/user.model";
import AppError from "./../utils/appError";
import { catchAsync } from "./../utils/catchAsync";
import { promisify } from "util";
import { UserType } from "../../types/type";
import sendEmail from "./email.controller";

const signToken = (id: string) => {
  const secret = (process.env.SECRET as string) || "";
  const expiresIn = process.env.JWT_EXPIRE || "30d";

  // signing the token
  const token = jwt.sign({ id }, secret, {
    expiresIn,
  });

  return token;
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create(req.body);
    const token = signToken(String(newUser._id));
    res.status(201).json({
      user: newUser,
      token,
    });
  },
);

export const signin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError("incorrect email or password", 401));
    const token = signToken(String(user._id));
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({
      user: userWithoutPassword,
      token,
    });
  },
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    // 1) check token and check if it is there
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // console.log(token);
    if (!token) return next(new AppError("please log in to get access", 401));

    // 2) validate the token
    const secret = String(process.env.SECRET) || "";
    interface DecodedToken {
      id: string;
      iat: number;
    }
    const decoded = jwt.verify(token, secret) as DecodedToken;

    // 3) check user if he still exist
    const freshUser = await User.findById(decoded.id);
    if (!freshUser)
      return next(new AppError("user does not exist log in again!", 401));

    // 4)check user changed password after jwt was issued
    if (freshUser.changedPasswordAfter(decoded.iat))
      return next(
        new AppError("the password has been changed please login again", 401),
      );

    req.user = freshUser;
    next();
  },
);

export const restrictTo = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role))
      return next(
        new AppError("you do not have permission to perform this action", 403),
      );
    next();
  };
};

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // get the user based on posted email
    const freshUser = await User.findOne({ email: req.body.email });

    if (!freshUser) return next(new AppError("user not exist", 400));

    // generate random token for reseting password
    const resetToken = freshUser.createPasswordResetToken();
    await freshUser.save({ validateBeforeSave: false });

    // send it to users email
    const resetURL = `${req.protocol}://${req.get(
      "host",
    )}/api/v1/users/resetPassword/${resetToken}`;

    try {
      const mailResponse = await sendEmail(req.body.email, resetURL);
      if (mailResponse.status !== "success")
        return next(
          new AppError("failed to sent email do check your email", 400),
        );
      res.status(200).json({
        status: "success",
        message: "message sent successfully",
      });
    } catch (err) {
      freshUser.passwordResetToken = undefined;
      freshUser.passwordResetExpires = undefined;
      await freshUser.save({ validateBeforeSave: false });
      console.log(err);

      return next(
        new AppError("there was an error while sending an email", 500),
      );
    }
  },
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) find the user
    if (!req.user) {
      return next(new AppError("User not found", 404));
    }
    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // 2) take data
    const { currentPassword, newPassword, passwordConfirm } = req.body;
    if (newPassword !== passwordConfirm) {
      return next(
        new AppError("New password and password confirm are not the same", 403),
      );
    }

    // check password confirm is same to the database password
    if (!(await user.correctPassword(currentPassword, user.password))) {
      return next(new AppError("Invalid current password", 400));
    }
    user.password = newPassword;
    user.passwordConfirm = passwordConfirm;
    await user.save();
    const token = signToken(String(user._id));

    res.status(200).json({
      status: "success",
      message: "Password changed successfully",
      token,
    });
  },
);

export const getMe = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return next(new AppError("User not found", 401));
  res.status(200).json({
    status: "success",
    user: req.user,
  });
};
