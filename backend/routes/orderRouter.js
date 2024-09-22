import express from "express";
import OrderControllers from "../controllers/OrderControllers.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/authenticatedUser.js";

const router = express.Router();

router.post("/payment/create", isAuthenticatedUser, OrderControllers.newOrder);

//user
router.get(
  "/me/orders/:id",
  isAuthenticatedUser,
  OrderControllers.getOrderDetail
);
router.get(
  "/me/user/detail",
  isAuthenticatedUser,
  OrderControllers.getUserOrder
);

//admin yönlendirme
router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  OrderControllers.orderGetProduct
);
router.get(
  "/admin/today/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  OrderControllers.orderTodayGet
);
router.delete(
  "/admin/orders/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  OrderControllers.orderDelete
);
export default router;
