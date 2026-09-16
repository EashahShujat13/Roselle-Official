import express from "express";
import verifyToken from "../middleware/verifyToken.mjs";
import isAdmin from "../middleware/isAdmin.mjs";
import {
  getAllOrdersAdmin,
  updateOrderStatus,
  getDashboardStats,
} from "../controllers/adminController.mjs";

const router = express.Router();


router.get("/stats", verifyToken, isAdmin, getDashboardStats);
router.get("/orders", verifyToken, isAdmin, getAllOrdersAdmin);
router.patch("/orders/:id/status", verifyToken, isAdmin, updateOrderStatus);

export default router;