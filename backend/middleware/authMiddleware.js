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

			// Could this be a load imbalance here? We might be calling the database A LOT if we do this.
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

export { protect };
