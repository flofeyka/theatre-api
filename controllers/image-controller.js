import { v2 as cloudinary } from "cloudinary";
import imagesService from "../services/images-service.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class imageController {
  async uploadImage(req, res, next) {
    try {
      const { path: temporaryName } = req.file;
      const result = await imagesService.uploadImage(temporaryName);
      return res.json(result.secure_url);
    } catch (e) {
      next(e);
    }
  }

  async deleteImage(req, res, next) {
    try {
      const result = await imagesService.deleteImage(req.body.imageUrl);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default new imageController();
