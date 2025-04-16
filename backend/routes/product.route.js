import express from "express";

import {
  createProducts,
  deleteProducts,
  getProducts,
  getProductsById,
  updateProducts,
} from "../controller/controller.js";

const router = express.Router();

// Create products
router.post("/", createProducts);
// Delete products
router.delete("/:id", deleteProducts);
// Fetch products
router.get("/", getProducts);
// Fetch products by id
router.get("/:id", getProductsById);
// update product
router.put("/:id", updateProducts);

export default router;
