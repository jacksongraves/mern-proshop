// Node.js modules for server setup
const express = require("express");

// Data imports for testing purposes
const products = require("./data/products");

// Set up the API
const app = express();

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

app.listen(5000, console.log("Server running on port 5000"));
