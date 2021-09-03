// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// import { Field, reduxForm } from 'redux-form';
import { addToCart } from "../actions/cartActions";

// Bootstrap Imports
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from "react-bootstrap";
// Component Imports
import Message from "../components/Message";

const CartScreen = ({ match, location, history }) => {
	// TODO: Assign state on a per-object basis
	const dispatch = useDispatch();
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	// TODO: If desired, destructure any state variables for ease of access
	// const  = useSelector((state) => state.);
	// const { destructuredParams } = ;

	// Run any setup code or per-render effects
	useEffect(() => {
		if (productId) {
			dispatch(addToCart({ id: productId, qty }));
		}
		// dispatch();
	}, [productId, qty]);

	const removeFromCartHandler = (id) => {
		console.log(`REMOVE ID ${id}`);
	};

	const checkoutHandler = () => {
		history.push("/login?redirect=shipping");
	};

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to='/'>Go Back</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart({
														id: item.product,
														qty: Number(e.target.value),
													})
												)
											}
										>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal ({cartItems.reduce((acc, cur) => acc + cur.qty, 0)})
								Items
							</h2>
							$
							{cartItems
								.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed to Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

// TODO: Assign default props for the component
CartScreen.defaultProps = {
	// : null,
};

// TODO: Assign PropTypes per prop
CartScreen.propTypes = {
	// :
};

// Connect the Redux store to the CartScreen component
export default CartScreen;
