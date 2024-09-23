import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";
import PaymentControllers from "../controllers/payment.controllers.js";

const router = express.Router();

router.post(
  "/payment/checkoutSession",
  isAuthenticatedUser,
  PaymentControllers.paymentCreate
);

export default router;
