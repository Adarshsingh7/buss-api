import mongoose, { Model, Schema } from "mongoose";
import { LocationType } from "../../types/type";

const locationSchema = new Schema<LocationType>({
  latitude: Number,
  longitude: Number,
  address: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
});

locationSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Location: Model<LocationType> = mongoose.model(
  "Location",
  locationSchema,
);
export default Location;
