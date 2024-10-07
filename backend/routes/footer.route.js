import express from "express";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";
import footerController from "../controllers/footer.controller.js";

const router = express.Router();

router.post(
  "/footer",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  footerController.footerCreate
);

export default router;
