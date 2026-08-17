import express from "express";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
} from "../controllers/orderController.mjs";

import verifyToken from "../middleware/verifyToken.mjs";

const router = express.Router();

router.post("/add", verifyToken, createOrder);
router.get("/", verifyToken, getMyOrders);
router.get("/:id", verifyToken, getSingleOrder);


export default router;