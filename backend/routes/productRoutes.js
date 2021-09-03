// Configure express as a router for an endpoint family
// Leverage asyncHandler middleware to better handle error management in the API
import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

// Data imports for testing purposes
import products from "../data/products.js";
import Product from "../models/productModel.js";

// Router family:
// /api/product/
// TODO: Add jsDoc coverage of endpoints

// GET all products
router.get(
	"/",
	asyncHandler(async (req, res) => {
		const products = await Product.find({});
		res.json(products);
	})
);

// GET a single product by id
router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id);

		if (product) {
			res.json(product);
		} else {
			res.status(404);
			throw new Error("Product not found");
		}
	})
);

export default router;
