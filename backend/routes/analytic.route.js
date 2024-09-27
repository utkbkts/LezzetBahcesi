import express from "express";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middleware/auth.middleware.js";
import analyticController from "../controllers/analytic.controller.js";

const router = express.Router();

router.get(
  "/admin/get_sales",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  analyticController.getSales
);

export default router;
