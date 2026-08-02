import express from "express";

import {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
  getFeaturedProducts,
  getSingleProduct,
  
} from "../controllers/productController.mjs";

const router = express.Router();

router.post("/add", addProduct);

router.get("/", getAllProducts);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.get("/search", searchProducts);

router.get("/featured", getFeaturedProducts);

router.get("/:id", getSingleProduct);

export default router;