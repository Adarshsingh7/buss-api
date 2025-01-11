import mongoose, { Model, Schema, Query } from "mongoose";
import { LocationType } from "../../types/type";
import { isWithinRange } from "../utils/isInRange";

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

// Middleware for `findOneAnd*` operations
locationSchema.pre(
  "findOneAndUpdate",
  async function (this: Query<LocationType, LocationType>, next) {
    const Stop = mongoose.model("Stop");

    // Access the update payload from the query
    const update = this.getUpdate() as Partial<LocationType>; // Cast to Partial<LocationType>
    if (!update) {
      return next(); // If there's no update, exit early
    }

    const stops = await Stop.find();
    for (let stop of stops) {
      if (
        isWithinRange(
          update?.latitude || 0,
          update?.longitude || 0,
          stop.latitude,
          stop.longitude,
        )
      ) {
        stop.arrivalStatus = "arrived";
        await stop.save();
      }
    }
    next();
  },
);

// Middleware for `save` operations
locationSchema.pre("save", function (this: LocationType & Document, next) {
  // Ensure `this` refers to the document being saved
  this.updatedAt = new Date();
  next();
});

const Location: Model<LocationType> = mongoose.model(
  "Location",
  locationSchema,
);
export default Location;
