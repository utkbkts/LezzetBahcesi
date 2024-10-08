import express from "express";
import aboutController from "../controllers/about.controller.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/about/create",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  aboutController.aboutCreate
);
router.get(
  "/about/get",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  aboutController.aboutGet
);
export default router;
