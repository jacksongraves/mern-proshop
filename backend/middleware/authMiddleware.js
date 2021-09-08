import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Set up a token / Bearer ${token} header middleware
const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (req?.headers?.authorization?.startsWith("Bearer ")) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Could this be a load imbalance here? We might be calling the database A LOT if we do this. A better way would be to only call the user when needed during the actual request; we can simply decode the expiration & JWT_SECRET and that should be sufficient for starters.
			req.user = await User.findById(decoded.id).select("-password");

			console.log(decoded);
			// next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error("Not authorized, token failed");
		}
	}

	if (!token) {
		res.status(401);
		throw new Error("Not authorized, no token");
	}

	next();
});

// Infer if a user is authorized as an Admin role
// Could extend this for additional roles & permissions
const admin = (req, res, next) => {
	if (req?.user?.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error("Not authorized as an admin");
	}
};
export { protect, admin };
