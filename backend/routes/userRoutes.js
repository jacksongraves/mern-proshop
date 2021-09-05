// Configure express as a router for an endpoint family
// Leverage asyncHandler middleware to better handle error management in the API
import express from "express";
import { authUser } from "../controllers/userControllers.js";
const router = express.Router();

// Router family:
// /api/users/
// TODO: Add jsDoc coverage of endpoints

// Using a controller approach to endpoints, where routes can be maintained legibly and separately from the functions they call

// GET Login the user
router.route("/login").get(authUser);

export default router;
