// Leverage asyncHandler middleware to better handle error management in the API
import asyncHandler from "express-async-handler";

// Data imports for testing purposes
// import products from "../data/products.js";

// Import the mongoose Schema for the Order collection
import Order from "../models/orderModel.js";

// Create an order ticket.
// Not good design: preference would be to calculate the fees etc on the back end.
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems?.length === 0) {
		res.status(400);
		throw new Error("No order items");
	} else {
		const order = new Order({
			// Inject the user placing the order
			user: req.user._id,

			// Carry the order metadata
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

// Get an order by Id
const getOrderById = asyncHandler(async (req, res) => {
	// .populate() grabs the nested or foreign key property with space-separated fields
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);
	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// Update order to paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
	// .populate() grabs the nested or foreign key property with space-separated fields
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// Update order to paid
const getMyOrders = asyncHandler(async (req, res) => {
	// .populate() grabs the nested or foreign key property with space-separated fields
	const orders = await Order.find({ user: req.user._id });

	console.log(orders);

	res.json(orders);
	// } else {
	// 	res.status(404);
	// 	throw new Error("Order not found");
	// }
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
