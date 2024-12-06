import fs from "fs";
import path from "path";
import { v4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class imageController {
  async uploadImage(req, res, next) {
    try {
      const { path: temporaryName } = req.file;

      const result = await cloudinary.uploader.upload(temporaryName, {
        folder: "images"
      });

      return res.json(result.secure_url);
    } catch (e) {
      next(e);
    }
  }
}

export default new imageController();
