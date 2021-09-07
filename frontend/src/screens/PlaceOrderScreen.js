// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// import { Field, reduxForm } from 'redux-form';
import { createOrder } from "../actions/orderActions";

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

const PlaceOrderScreen = ({
	match,
	location,
	history,
	step1,
	step2,
	step3,
	step4,
}) => {
	// TODO: Assign state on a per-object basis
	const { paymentMethod, shippingAddress, cartItems } = useSelector(
		(state) => state.cart
	);
	const { address, city, postalCode, country } = shippingAddress;

	const addDecimals = (num) => Number((Math.round(num * 100) / 100).toFixed(2));
	/**
	 * @todo This would be better calculated and handled on the backend, not the front end.
	 */
	const itemPrice = addDecimals(
		cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);

	const shippingPrice = addDecimals(itemPrice > 100 ? 0 : 100);
	const taxPrice = addDecimals(0.15 * itemPrice);
	const totalPrice = addDecimals(itemPrice + shippingPrice + taxPrice);

	const dispatch = useDispatch();

	// TODO: If desired, destructure any state variables for ease of access
	const { order, success, error } = useSelector((state) => state.orderCreate);

	// Run any setup code or per-render effects
	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
		}
	}, [history, success]);

	const placeOrderHandler = (e) => {
		e.preventDefault();
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
			})
		);
	};
	return (
		<Fragment>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
								{address}, {city} {postalCode}, {country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method:</strong>
								{paymentMethod}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{cartItems.map((item, index) => (
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
									<Col>${itemPrice.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${shippingPrice.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${taxPrice.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${totalPrice.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{/* {message && <Message variant='danger'>{message}</Message>} */}
								{error && <Message variant='danger'>{error}</Message>}
								{/* {loading && <Loader />} */}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={cartItems.length === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

// TODO: Assign default props for the component
PlaceOrderScreen.defaultProps = {
	// : null,
};

// TODO: Assign PropTypes per prop
PlaceOrderScreen.propTypes = {
	// :
};

// Connect the Redux store to the PlaceOrderScreen component
export default PlaceOrderScreen;
