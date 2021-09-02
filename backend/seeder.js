// Key imports for Node.js and DB interaction
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

// Seed data
import users from "./data/users.js";
import products from "./data/products.js";

// Database models
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

// Configure for DB seed
dotenv.config();
connectDB();

const importData = async (params) => {
	try {
		// Clear the database to avoid conflicts
		console.warn("Warning!!! Deleting data from database".red.underline.bold);
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		// Create all users from the seed
		const createdUsers = await User.insertMany(users);

		console.log(createdUsers);
		// Extract the admin user: this only works because our seed data has the admin user FIRST
		const adminUser = createdUsers[0]._id;

		// Default pass in the admin user for testing purposes
		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		await Product.insertMany(sampleProducts);

		console.log("Data imported!".green.inverse);

		// Terminate the node script.
		process.exit();
	} catch (error) {
		console.error(error.message);

		// Terminate with failure.
		process.exit(1);
	}
};

const destroyData = async (params) => {
	try {
		// Clear the database to avoid conflicts
		console.warn("Warning!!! Deleting data from database".red.underline.bold);
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log("Data Destroyed!".red.inverse);

		// Terminate the node script.
		process.exit();
	} catch (error) {
		console.error(`${error.message}`.red.inverse);

		// Terminate with failure.
		process.exit(1);
	}
};

// Call the process via CLI argument
if (process.argv[2] === "-d") {
	destroyData();
} else {
	importData();
}
