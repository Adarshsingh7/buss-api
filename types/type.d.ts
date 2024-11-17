import { Document, ObjectId } from "mongoose";

interface UserType extends Document {
  name: string;
  email: string;
  phone: string;
  photo: string;
  route: ObjectId | null;
  stop: ObjectId | null;
  role: "student" | "driver" | "admin";
  password: string;
  passwordConfirm?: string; // Made optional to handle the case after validation
  isActive: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  passwordChangedAt?: Date;

  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): string;
}

export { UserType };
