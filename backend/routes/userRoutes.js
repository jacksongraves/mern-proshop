// Configure express as a router for an endpoint family
// Leverage asyncHandler middleware to better handle error management in the API
import express from "express";
import {
	authUser,
	getUserProfile,
	getUsers,
	registerUser,
	updateUserProfile,
	deleteUser,
	updateUser,
	getUserById,
} from "../controllers/userControllers.js";

// Authentication middleware
import { protect, admin } from "../middleware/authMiddleware.js";

// Set up our router
const router = express.Router();

// Router family:
// /api/users/
// TODO: Add jsDoc coverage of endpoints

// Using a controller approach to endpoints, where routes can be maintained legibly and separately from the functions they call

// POST Create a new profile / register a user
router.route("/").post(registerUser).get(protect, admin, getUsers);

// POST Login the user
router.route("/login").post(authUser);

// User profile: Both a GET & a PUT request handler
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

// Delete a user
router
	.route("/:id")
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser);

export default router;
