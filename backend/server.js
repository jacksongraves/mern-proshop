// Node.js modules for server setup
import express from "express";
import dotenv from "dotenv";
import colors from "colors";

// MongoDB connection
import connectDB from "./config/db.js";

// Data imports for testing purposes
import products from "./data/products.js";

// Set up the API and environment variables
dotenv.config();
connectDB();
const app = express();

// ----BEGIN ENDPOINTS----

// Get root endpoint
app.get("/", (req, res) => {
	res.send("API is running...");
});

// GET all products
app.get("/api/products", (req, res) => {
	res.json(products);
});

// GET a single product by id
app.get("/api/products/:id", (req, res) => {
	const product = products.find((p) => p._id === req.params.id);
	res.json(product);
});

// ----END ENDPOINTS----

// Launch the server and listen on target port
const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
