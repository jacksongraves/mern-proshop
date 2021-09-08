// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// import { Field, reduxForm } from 'redux-form';
import {
	createOrder,
	getOrderDetails,
	payOrder,
} from "../actions/orderActions";

// Bootstrap Imports
import {
	Form,
	Button,
	Row,
	Col,
	ListGroup,
	Image,
	Card,
} from "react-bootstrap";

// Component Imports
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { ORDER_PAY_RESET } from "../actions/types";

const OrderScreen = ({
	match,
	location,
	history,
	step1,
	step2,
	step3,
	step4,
}) => {
	const dispatch = useDispatch();

	const [sdkReady, setSdkReady] = useState(false);

	// TODO: If desired, destructure any state variables for ease of access
	const orderId = match.params.id;

	const { order, loading, error } = useSelector((state) => state.orderDetails);

	const { loading: loadingPay, success: successPay } = useSelector(
		(state) => state.orderPay
	);

	const {
		paymentMethod,
		shippingAddress,
		orderItems,
		taxPrice,
		shippingPrice,
		totalPrice,
		user,
		isDelivered,
		deliveredAt,
		isPaid,
		paidAt, // May not work
	} = order || {};
	const { address, city, postalCode, country } = shippingAddress || {};

	const addDecimals = (num) => Number((Math.round(num * 100) / 100).toFixed(2));
	/**
	 * @todo This would be better calculated and handled on the backend, not the front end.
	 */
	const itemPrice = orderItems?.reduce(
		(acc, item) => acc + item.price * item.qty,
		0
	);

	// Run any setup code or per-render effects
	useEffect(() => {
		// Without this check, we get a vicious cycle of attempting to reload and re-request the order

		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};

		let successDeliver = false;

		if (!order || successPay || successDeliver || order._id !== orderId) {
			dispatch({ type: ORDER_PAY_RESET });
			// dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [orderId, order, successPay]);

	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);
		dispatch(payOrder({ id: orderId, paymentResult }));
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Fragment>
			<h1>Order {order?._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<strong>Name: </strong> {user?.name}
							<a href={`mailto:${user?.email}`}>{user?.email}</a>
							<p>
								<strong>Address:</strong>
								{address}, {city} {postalCode}, {country}
							</p>
							{isDelivered ? (
								<Message variant='success'>Delivered on {deliveredAt}</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method:</strong>
								{paymentMethod}
							</p>
							{isPaid ? (
								<Message variant='success'>Paid on {paidAt}</Message>
							) : (
								<Message variant='danger'>Not Paid</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{orderItems?.length === 0 ? (
								<Message>Order is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{orderItems?.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${itemPrice?.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${shippingPrice?.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${taxPrice?.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${totalPrice?.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{/* {message && <Message variant='danger'>{message}</Message>} */}
								{error && <Message variant='danger'>{error}</Message>}
								{/* {loading && <Loader />} */}
							</ListGroup.Item>

							{!isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton
											amount={order.totalPrice}
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

// TODO: Assign default props for the component
OrderScreen.defaultProps = {
	// : null,
};

// TODO: Assign PropTypes per prop
OrderScreen.propTypes = {
	// :
};

// Connect the Redux store to the OrderScreen component
export default OrderScreen;
