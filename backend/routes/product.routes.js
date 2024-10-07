import express from "express";

import ProductControllers from "../controllers/product.controllers.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";
import validateRequestBody from "../middleware/validate.middleware.js";
import productSchema from "../validation/productValidation.js";

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

//admin

router.post(
  "/admin/products",
  validateRequestBody(productSchema),
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
