// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// import { Field, reduxForm } from 'redux-form';
import { savePaymentMethod } from "../actions/cartActions";

// Bootstrap Imports
import { Form, Button, Row, Col } from "react-bootstrap";

// Component Imports
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({ match, location, history }) => {
	// TODO: Assign state on a per-object basis

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push("/shipping");
	}

	// destructure any state variables for ease of access
	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const dispatch = useDispatch();

	// Run any setup code or per-render effects
	// useEffect(() => {
	// dispatch();
	// }, [dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push("/placeorder");
	};

	/**
	 * @description **JSX Note**: The `Form.Check` in this block is modular and can be reused to add additional payment methods in the future.
	 */
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			{/* {message && <Message variant='danger'>{message}</Message>} */}
			{/* {error && <Message variant='danger'>{error}</Message>} */}
			{/* {loading && <Loader />} */}
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>

					<Col>
						<Form.Check
							type='radio'
							label='PayPal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
						{/* <Form.Check
							type='radio'
							label='Stripe'
							id='Stripe'
							name='paymentMethod'
							value='Stripe'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check> */}
					</Col>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

// TODO: Assign default props for the component
PaymentScreen.defaultProps = {
	// : null,
};

// TODO: Assign PropTypes per prop
PaymentScreen.propTypes = {
	// :
};

// Connect the Redux store to the PaymentScreen component
export default PaymentScreen;
