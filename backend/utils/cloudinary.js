import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload_file = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        folder,
        resource_type: "image",
        transformation: [
          { width: 1024, quality: "auto:good", fetch_format: "auto" },
        ],
      },

      (error, result) => {
        if (error) {
          reject(error);
          console.error("Error uploading file:", error);
        } else {
          resolve({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      }
    );
  });
};

export const delete_file = async (file) => {
  const res = await cloudinary.v2.uploader.destroy(file);
  if (res?.result === "ok") return true;
};
