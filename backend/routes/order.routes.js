import express from "express";
import OrderControllers from "../controllers/order.controllers.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";

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

router.delete(
  "/admin/orders/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  OrderControllers.orderDelete
);
router.put(
  "/admin/orders/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  OrderControllers.updateOrderStatus
);

export default router;
