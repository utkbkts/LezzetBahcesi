import express from "express";

import ProductControllers from "../controllers/ProductControllers.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/authenticatedUser.js";

const router = express.Router();

router.get("/products", ProductControllers.getAllProduct);
router.get("/products/category", ProductControllers.getCategoryProductAll);
router.get("/product/:id", ProductControllers.productById);

router.put(
  "/reviews",
  isAuthenticatedUser,
  ProductControllers.createProductReviews
);

router.get("/reviews/user", isAuthenticatedUser, ProductControllers.getReviews);
router.get(
  "/product/user/detail",
  isAuthenticatedUser,
  ProductControllers.getUserProduct
);

//admin

router.post(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  ProductControllers.createProduct
);

router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  ProductControllers.getProducts
);
router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  ProductControllers.getProductReview
);

router.delete(
  "/admin/products/delete/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  ProductControllers.deleteProduct
);

router.delete(
  "/admin/reviews",
  isAuthenticatedUser,
  ProductControllers.deleteReviews
);

export default router;
