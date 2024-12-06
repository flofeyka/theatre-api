import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import imageController from "../controllers/image-controller.js";
import upload from "../middlewares/upload-middleware.js";

export const imageRouter = Router();

imageRouter.post("/", authMiddleware, upload.single('image'), imageController.uploadImage);