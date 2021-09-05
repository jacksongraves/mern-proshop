// Leverage asyncHandler middleware to better handle error management in the API
import asyncHandler from "express-async-handler";

// Data imports for testing purposes
// import users from "../data/users.js";

// Import the mongoose Schema for the Product collection
import User from "../models/userModel.js";

// Authorize the user & get token
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: null,
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

export { authUser };
