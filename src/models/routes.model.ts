import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

export interface RoutesType extends Document {
  routeNumber: number;
  routeName: string;
  stops: ObjectId[];
  status: "arrival" | "return";
}

const RoutesSchema: Schema = new Schema({
  routeNumber: {
    type: Number,
    required: [true, "Route number is required"],
    min: [1, "Route number must be at least 1"],
  },
  stops: [
    {
      type: Schema.Types.ObjectId,
      ref: "Stop",
      unique: true,
    },
  ],
  routeName: {
    type: String,
    required: [true, "Route name is required"],
    trim: true,
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: {
      values: ["arrival", "return"],
      message: 'Status must be either "arrival" or "return"',
    },
  },
});

RoutesSchema.post("save", function (error: any, doc: any, next: any) {
  if (error.name === "ValidationError") {
    next(new Error("Validation failed: " + error.message));
  } else {
    next(error);
  }
});
const routesModel: Model<RoutesType> = mongoose.model<RoutesType>(
  "Route",
  RoutesSchema,
);

export default routesModel;
