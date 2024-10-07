import express from "express";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";
import menuController from "../controllers/menu.controller.js";

const router = express.Router();

router.post(
  "/menu",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  menuController.menuCreate
);

export default router;
