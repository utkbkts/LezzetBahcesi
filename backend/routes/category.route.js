import express from "express";
import categoryController from "../controllers/category.controller.js";

const router = express.Router();

router.post("/category/add", categoryController.CategoryAdd);
router.get("/category/get", categoryController.CategoryGetAll);

export default router;
