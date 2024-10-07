import express from "express";
import reservationController from "../controllers/reservation.controller.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";
import validateRequestBody from "../middleware/validate.middleware.js";
import reservationSchema from "../validation/reservationValidation.js";

const router = express.Router();

router.post(
  "/reservation",
  validateRequestBody(reservationSchema),
  reservationController.reservationSave
);
router.get(
  "/reservation/get",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  reservationController.reservationGet
);
router.put(
  "/reservation/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  reservationController.reservationUpdate
);
export default router;
