import multer from "multer";
import { uploadToCloudinary } from "../utils/cloudinaryConfig";

const storage = multer.memoryStorage();
const upload = multer({ storage });
export const createUpload = upload.single("image");
export const uploader = async (req: any, res: any): Promise<void> => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const result = await uploadToCloudinary(req.file.buffer);
    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Image upload failed", details: error.message });
  }
};
