import { Router } from "express";
import { body, param } from "express-validator";
import sessionController from "../controllers/session-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import validateMiddleware from "../middlewares/validate-middleware.js";

export const sessionRouter = Router();

sessionRouter.get(
  "/:session_id",
  param("session_id").isInt().notEmpty(),
  validateMiddleware,
  sessionController.getSessionById
);
sessionRouter.get(
  "/all/:repertoireId",
  param("repertoireId").isInt().notEmpty(),
  validateMiddleware,
  sessionController.getAllSessions
);
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
  "/delete/:session_id",
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
sessionRouter.get(
  "/book/all",
  authMiddleware,
  sessionController.getBookingSessions
)
sessionRouter.post(
  "/book",
  body("session_id").isInt().notEmpty(),
  body("position").isArray().notEmpty(),
  validateMiddleware,
  authMiddleware,
  sessionController.bookSession
);
sessionRouter.delete(
  "/cancel-booking/",
  body("session_id").isInt().notEmpty(),
  body("position").isArray().notEmpty(),
  validateMiddleware,
  authMiddleware,
  sessionController.cancelBooking
);
