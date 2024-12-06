import { Router } from "express";
import authController from "../controllers/auth-controller.js";
import { body } from "express-validator";
import validateMiddleware from "../middlewares/validate-middleware.js";

export const authRouter = Router();

authRouter.post(
  "/sign-up",
  body("fullName").isString().notEmpty(),
  body("phoneNumber").isString().notEmpty(),
  body("email").isEmail().notEmpty(),
  body("password").isString().notEmpty(),
  body("birth").isString().notEmpty(),
  validateMiddleware,
  authController.signUp
);
authRouter.post(
  "/sign-in",
  body("email").isEmail().notEmpty(),
  body("password").isString().notEmpty(),
  validateMiddleware,
  authController.signIn
);
authRouter.put("/refresh", authController.refresh);
