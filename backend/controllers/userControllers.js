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
		res.status(404);
		throw new Error("User not found");
	}
});

// PRIVATE: Update user profile
// Note: we could technically just grab the user from the injected protect middleware...?
// user === req.user... without the password hash.
const updateUserProfile = asyncHandler(async (req, res) => {
	// Requires auth middleware - could use the decoded id though.
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		// Overwrite the updates.
		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

const getUsers = asyncHandler(async (req, res) => {
	// Requires auth middleware - could use the decoded id though.
	const users = await User.find({});
	res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
	// Requires auth middleware - could use the decoded id though.
	const user = await User.findById(req.params.id);

	if (user) {
		await user.remove();
		res.json({ message: "User removed" });
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// Admin protected
const getUserById = asyncHandler(async (req, res) => {
	// Requires auth middleware - could use the decoded id though.
	const user = await User.findById(req.params.id).select("-password");

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// Admin protected
const updateUser = asyncHandler(async (req, res) => {
	// Requires auth middleware - could use the decoded id though.
	const user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;

		// Overwrite the updates.
		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
};
