import crypto from "crypto";
import mongoose, { Document, Model, ObjectId, Query, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { UserType } from "../../types/type";

// Create the UserType Schema
const userSchema = new Schema<UserType>({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Enter a valid email address"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    minlength: [10, "Minimum 10-digit phone number is required"],
    maxlength: [13, "Maximum 13-digit phone number is allowed"],
    unique: true,
  },
  photo: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png",
  },
  role: {
    type: String,
    enum: ["student", "driver", "admin", "super-admin"],
    required: [true, "Role is required"],
  },
  route: {
    type: Schema.Types.ObjectId,
    ref: "Route",
    default: null,
  },
  stop: {
    type: Schema.Types.ObjectId,
    ref: "Stop",
    default: null,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Minimum 8-character password is required"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password confirmation is required"],
    validate: {
      validator: function (this: UserType, el: string): boolean {
        return this.password === el;
      },
      message: "Passwords do not match",
    },
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: "School",
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
    select: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  passwordChangedAt: Date,
});

userSchema.pre(/^find/, function (this: Query<UserType, UserType>, next) {
  this.find({ isActive: { $ne: false } });
  next();
});

// Middleware: Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash the password with a salt round of 10
  this.password = await bcrypt.hash(this.password, 10);

  // Remove passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// Middleware: Set passwordChangedAt field
userSchema.pre("save", function (next) {
  if (this.isModified("password") && !this.isNew) {
    this.passwordChangedAt = new Date(Date.now() - 1000); // Slight delay to account for JWT token creation
  }
  next();
});

// Instance Method: Compare passwords
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance Method: Check if password was changed after the JWT token was issued
userSchema.methods.changedPasswordAfter = function (
  JWTTimestamp: number,
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000,
    );
    return JWTTimestamp < changedTimestamp;
  }

  // Password not changed
  return false;
};

// Instance Method: Generate password reset token
userSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // Token valid for 10 minutes

  return resetToken;
};

// Create the UserType model
const User: Model<UserType> = mongoose.model<UserType>("User", userSchema);

export default User;
