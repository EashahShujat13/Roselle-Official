import express from "express";
import verifyToken from "../middleware/verifyToken.mjs";
import isAdmin from "../middleware/isAdmin.mjs";
import {
  getAllOrdersAdmin,
  updateOrderStatus,
  getDashboardStats,
} from "../controllers/adminController.mjs";
import { backfillUserRoles } from "../controllers/adminController.mjs";

const router = express.Router();


router.get("/stats", verifyToken, isAdmin, getDashboardStats);
router.get("/orders", verifyToken, isAdmin, getAllOrdersAdmin);
router.get("/backfill-roles", verifyToken, isAdmin, backfillUserRoles);//to modify user roles in the database, run this route once and then comment it out. It is not meant to be used in production.
router.patch("/orders/:id/status", verifyToken, isAdmin, updateOrderStatus);

export default router;