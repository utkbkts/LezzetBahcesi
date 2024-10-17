import express from "express";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";
import menuController from "../controllers/menu.controller.js";

const router = express.Router();

router.post(
  "/menu/create",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  menuController.menuCreate
);

router.get("/menu/get", menuController.menuGet);

export default router;
