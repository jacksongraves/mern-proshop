// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// import { Field, reduxForm } from 'redux-form';
import { saveShippingAddress } from "../actions/cartActions";

// Bootstrap Imports
import { Form, Button, Row, Col } from "react-bootstrap";

// Component Imports
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({ match, location, history }) => {
	// TODO: Assign state on a per-object basis

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	// destructure any state variables for ease of access
	const [address, setAddress] = useState(shippingAddress.address || "");
	const [city, setCity] = useState(shippingAddress.city || "");
	const [postalCode, setPostalCode] = useState(
		shippingAddress.postalCode || ""
	);
	const [country, setCountry] = useState(shippingAddress.country || "");

	const dispatch = useDispatch();

	// Run any setup code or per-render effects
	// useEffect(() => {
	// dispatch();
	// }, [dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		history.push("/payment");
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			{/* {message && <Message variant='danger'>{message}</Message>} */}
			{/* {error && <Message variant='danger'>{error}</Message>} */}
			{/* {loading && <Loader />} */}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Address'
						value={address}
						required
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='City'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter City'
						value={city}
						required
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='postalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Postal Code'
						value={postalCode}
						required
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='Country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Country'
						value={country}
						required
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

// TODO: Assign default props for the component
ShippingScreen.defaultProps = {
	// : null,
};

// TODO: Assign PropTypes per prop
ShippingScreen.propTypes = {
	// :
};

// Connect the Redux store to the ShippingScreen component
export default ShippingScreen;
