import express, { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/cloudinaryConfig";
import { createUpload, uploader } from "./../controllers/image.controller";

const uploadRouter = express.Router();
uploadRouter.post("/", createUpload, uploader);

export default uploadRouter;
