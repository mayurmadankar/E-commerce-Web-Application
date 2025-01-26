import cloudinary from "cloudinary";
import multer from "multer";

cloudinary.v2.config({
  cloud_name: "djf79gdgc",
  api_key: "238582856796925",
  api_secret: "dmkblev9lnz5PtMsF406W39VEYc",
});

const storage = multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

export { upload, imageUploadUtil };
