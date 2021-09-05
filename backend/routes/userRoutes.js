// Configure express as a router for an endpoint family
// Leverage asyncHandler middleware to better handle error management in the API
import express from "express";
import {
	authUser,
	getUserProfile,
	registerUser,
} from "../controllers/userControllers.js";

// Authentication middleware
import { protect } from "../middleware/authMiddleware.js";

// Set up our router
const router = express.Router();

// Router family:
// /api/users/
// TODO: Add jsDoc coverage of endpoints

// Using a controller approach to endpoints, where routes can be maintained legibly and separately from the functions they call

// POST Create a new profile / register a user
router.route("/").post(registerUser);

// POST Login the user
router.route("/login").post(authUser);

// GET user profile
router.route("/profile").get(protect, getUserProfile);

export default router;
