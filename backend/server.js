// Node.js modules for server setup
import express from "express";
import dotenv from "dotenv";
import colors from "colors";

// MongoDB connection
import connectDB from "./config/db.js";

// Route & middleware imports
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";

// Set up the API and environment variables
dotenv.config();
connectDB();
const app = express();

// ----BEGIN ENDPOINTS----

// Get root endpoint
app.get("/", (req, res) => {
	res.send("API is running...");
});

// Initialize Route Families
app.use("/api/products", productRoutes);

// Specify middleware for global not found (404) and other error handling
app.use(notFoundHandler);
app.use(errorHandler);

// ----END ENDPOINTS----

// Launch the server and listen on target port
const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
