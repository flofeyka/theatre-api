import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import repertoireController from "../controllers/repertoire-controller.js";

export const repertoireRouter = Router();

repertoireRouter.post("/", authMiddleware, repertoireController.addRepertoire);
repertoireRouter.put("/", authMiddleware, repertoireController.editRepertoire);
repertoireRouter.get("/", authMiddleware, repertoireController.getAllRepertoires);