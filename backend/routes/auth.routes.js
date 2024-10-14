import express from "express";
import AuthControllers from "../controllers/auth.controllers.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", AuthControllers.RegisterUser);
router.post("/login", AuthControllers.LoginUser);
router.post("/logout", isAuthenticatedUser, AuthControllers.LogoutUser);
router.get("/me", isAuthenticatedUser, AuthControllers.GetUserProfile);
router.put("/me/update", isAuthenticatedUser, AuthControllers.updateProfile);
router.post("/password/forgot", AuthControllers.ForgotPassword);
router.put("/password/reset/:token", AuthControllers.ResetPassword);
router.put(
  "/password/updatePassword",
  isAuthenticatedUser,
  AuthControllers.UpdateProfilePassword
);
//admin
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  AuthControllers.getAllUsersAdmin
);
router.put(
  "/admin/users/role/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  AuthControllers.updateUserRole
);
router.put(
  "/admin/users/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  AuthControllers.blockedUser
);

export default router;
