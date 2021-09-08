// Configure express as a router for an endpoint family
// Leverage asyncHandler middleware to better handle error management in the API
import express from "express";
import {
	addOrderItems,
	getOrderById,
} from "../controllers/orderControllers.js";

// Authentication middleware
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Router family:
// /api/product/
// TODO: Add jsDoc coverage of endpoints

// Using a controller approach to endpoints, where routes can be maintained legibly and separately from the functions they call

// Place an order
router.route("/").post(protect, addOrderItems);

// Get an order by id
router.route("/:id").get(protect, getOrderById);

export default router;
