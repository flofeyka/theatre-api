import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class imagesService {
  async uploadImage(temporaryName) {
    const result = await cloudinary.uploader.upload(temporaryName, {
      folder: "images"
    });

    return result.secure_url;
  }

  async deleteImage(image) {
    const publicId = image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`images/${publicId}`)
  }
};

export default new imagesService();