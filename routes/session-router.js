import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import sessionController from "../controllers/session-controller.js";
import { body, param, validationResult } from "express-validator";
import validateMiddleware from "../middlewares/validate-middleware.js";

export const sessionRouter = Router();

sessionRouter.get(
  "/:session_id",
  param("session_id").isInt().notEmpty(),
  validateMiddleware,
  sessionController.getSessionById
);
sessionRouter.get("/", sessionController.getAllSessions);
sessionRouter.post(
  "/",
  body("repertoireId").isInt().notEmpty(),
  body("time").isString().notEmpty(),
  body("price").isInt().notEmpty(),
  validateMiddleware,
  authMiddleware,
  sessionController.addSession
);
sessionRouter.delete(
  "/:session_id",
  param("session_id").isInt().notEmpty(),
  validateMiddleware,
  authMiddleware,
  sessionController.deleteSession
);
sessionRouter.put(
  "/",
  body("time").isDate().notEmpty(),
  body("price").isInt().notEmpty(),
  validateMiddleware,
  authMiddleware,
  sessionController.editSession
);
sessionRouter.post(
  "/book",
  body("session_id").isInt().notEmpty(),
  body("row").isInt().notEmpty(),
  body("place").isInt().notEmpty(),
  validateMiddleware,
  authMiddleware,
  sessionController.bookSession
);
