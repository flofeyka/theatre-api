import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import userController from "../controllers/user-controller.js";
import roleMiddleware from "../middlewares/role-middleware.js";

export const userRouter = Router();

userRouter.get("/:id", authMiddleware, roleMiddleware('admin'), userController.findUser);
