import express from "express";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";
import footerController from "../controllers/footer.controller.js";

const router = express.Router();

router.post(
  "/footer/create",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  footerController.footerCreate
);
router.get(
  "/footer/get",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  footerController.footerGet
);
export default router;
