import express from "express";

import {
  getMyWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/wishlistController.mjs";

import verifyToken from "../middleware/verifyToken.mjs";

const router = express.Router();

router.get("/", verifyToken, getMyWishlist);

router.post("/add", verifyToken, addToWishlist);

router.delete("/:productId", verifyToken, removeFromWishlist);

router.delete("/", verifyToken, clearWishlist);

export default router;