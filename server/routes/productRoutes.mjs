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

import { getProductsByCategory } from '../controllers/categoryController.mjs';
import verifyToken from "../middleware/verifyToken.mjs";
import isAdmin from "../middleware/isAdmin.mjs";


const router = express.Router();

router.post("/add", verifyToken, isAdmin, addProduct);
router.get("/", getAllProducts);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);
router.get("/search", searchProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getSingleProduct);

export default router;