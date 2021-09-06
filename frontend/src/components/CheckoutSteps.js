// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// import { Field, reduxForm } from 'redux-form';
// import {  } from '../actions/';

// Bootstrap Imports
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// Component Imports
// import Component from './Component';

const CheckoutSteps = ({
	match,
	location,
	history,
	step1,
	step2,
	step3,
	step4,
}) => {
	// TODO: Assign state on a per-object basis
	return (
		<Nav className='justify-content-center mb-4'>
			<Nav.Item>
				{step1 ? (
					<LinkContainer to='/login'>
						<Nav.Link>Sign In</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Sign In</Nav.Link>
				)}
			</Nav.Item>
			<Nav.Item>
				{step2 ? (
					<LinkContainer to='/shipping'>
						<Nav.Link>Shipping</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Shipping</Nav.Link>
				)}
			</Nav.Item>
			<Nav.Item>
				{step3 ? (
					<LinkContainer to='/payment'>
						<Nav.Link>Payment</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Payment</Nav.Link>
				)}
			</Nav.Item>
			<Nav.Item>
				{step4 ? (
					<LinkContainer to='/placeorder'>
						<Nav.Link>Place Order</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Place Order</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	);
};

// TODO: Assign default props for the component
CheckoutSteps.defaultProps = {};

// TODO: Assign PropTypes per prop
CheckoutSteps.propTypes = {};

// Connect the Redux store to the CheckoutSteps component
export default CheckoutSteps;
