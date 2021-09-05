// Configure express as a router for an endpoint family
// Leverage asyncHandler middleware to better handle error management in the API
import express from "express";
import {
	getProductById,
	getProducts,
} from "../controllers/productControllers.js";
const router = express.Router();

// Router family:
// /api/product/
// TODO: Add jsDoc coverage of endpoints

// Using a controller approach to endpoints, where routes can be maintained legibly and separately from the functions they call

// GET all products
router.route("/").get(getProducts);

// GET a single product by id
router.route("/:id").get(getProductById);

export default router;
