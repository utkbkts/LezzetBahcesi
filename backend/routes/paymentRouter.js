import express from "express";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/authenticatedUser.js";
import PaymentControllers from "../controllers/PaymentControllers.js";

const router = express.Router();

router.post(
  "/payment/checkoutSession",
  isAuthenticatedUser,
  PaymentControllers.paymentCreate
);

export default router;
