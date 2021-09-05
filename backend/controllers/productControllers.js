// Leverage asyncHandler middleware to better handle error management in the API
import asyncHandler from "express-async-handler";

// Data imports for testing purposes
// import products from "../data/products.js";

// Import the mongoose Schema for the Product collection
import Product from "../models/productModel.js";

// GET all products
// Controller for /api/products/ route
const getProducts = asyncHandler(async (req, res) => {
	console.log(req.body);
	const products = await Product.find({});
	res.json(products);
});

// GET product by id
// Controller for /api/products/:id? route
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export { getProducts, getProductById };
