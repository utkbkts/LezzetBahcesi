import express from "express";
import aboutController from "../controllers/about.controller.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.put(
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
router.delete(
  "/about/delete/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  aboutController.aboutDelete
);

export default router;
