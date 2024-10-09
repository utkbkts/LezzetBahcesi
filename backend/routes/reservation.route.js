import express from "express";
import reservationController from "../controllers/reservation.controller.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/reservation", reservationController.reservationSave);
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
router.delete(
  "/reservation/delete/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  reservationController.resetvationDelete
);
export default router;
