// Specify middleware for global not found (404) handling
const notFoundHandler = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

// Specify middleware for global error handling
const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode).json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
	// No need to specify next() because we are terminating the request via res.json()
};

export { notFoundHandler, errorHandler };
