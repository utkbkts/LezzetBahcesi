import express from "express";
import aboutController from "../controllers/about.controller.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/about",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  aboutController.aboutCreate
);

export default router;
