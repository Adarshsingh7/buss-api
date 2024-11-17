import mongoose, { Schema, Document, Model } from "mongoose";

export interface StopType extends Document {
  latitude: number;
  longitude: number;
  address: string;
  stopNumber: number;
}

const StopSchema = new Schema<StopType>({
  latitude: {
    type: Number,
    required: [true, "Latitude is required"],
    min: [-90, "Latitude must be between -90 and 90"],
    max: [90, "Latitude must be between -90 and 90"],
  },
  longitude: {
    type: Number,
    required: [true, "Longitude is required"],
    min: [-180, "Longitude must be between -180 and 180"],
    max: [180, "Longitude must be between -180 and 180"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
  },
  stopNumber: {
    type: Number,
    required: [true, "StopType number is required"],
    unique: true,
  },
});

const stopModel: Model<StopType> = mongoose.model("Stop", StopSchema);

export default stopModel;
