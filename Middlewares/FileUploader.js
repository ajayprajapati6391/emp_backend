import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "upload",
    allowed_formats: ["jpg", "jpeg", "png", "webp"] ,
    public_id: (req, file) => file.originalname.split(".")[0] + "",
  },
});

const cloudinaryFileUpload = multer({ storage: storage });

export { cloudinaryFileUpload };
