import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto"
  });

  return result;
}

const upload = multer({ storage });

export { upload, imageUploadUtil };
