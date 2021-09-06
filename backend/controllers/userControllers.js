// Leverage asyncHandler middleware to better handle error management in the API
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// Data imports for testing purposes
// import users from "../data/users.js";

// Import the mongoose Schema for the Product collection
import User from "../models/userModel.js";

// Authorize the user & get token
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	console.log("Data");

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

// Register a new user (Post)
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}
	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// PRIVATE: Get user profile
// Note: we could technically just grab the user from the injected protect middleware...?
// user === req.user... without the password hash.
const getUserProfile = asyncHandler(async (req, res) => {
	// Requires auth middleware
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401);
		throw new Error("User not found");
	}
});

export { authUser, getUserProfile, registerUser };
