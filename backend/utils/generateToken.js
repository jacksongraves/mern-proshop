import jwt from "jsonwebtoken";

/**
 *
 * @param {string} id The user id of an account
 * @returns {Boolean}
 */
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default generateToken;
