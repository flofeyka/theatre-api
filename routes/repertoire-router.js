import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import repertoireController from "../controllers/repertoire-controller.js";
import roleMiddleware from "../middlewares/role-middleware.js";

export const repertoireRouter = Router();

repertoireRouter.post("/", authMiddleware, roleMiddleware('admin'), repertoireController.addRepertoire);
repertoireRouter.put("/", authMiddleware, roleMiddleware('admin'), repertoireController.editRepertoire);
repertoireRouter.get("/", repertoireController.getAllRepertoires);
