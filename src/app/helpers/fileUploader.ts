import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: "djqyb52xi",
  api_key: "635181914688275",
  api_secret: "Rj1owdgKmUDS-WkIJFKVdYClIRo",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: any) => {
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload("D:/level2/Backend/hos-care-backend/uploads/hosain.png", {
      public_id: "shoes",
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
