// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";

// Redux Imports
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Card } from "react-bootstrap";
// TODO: Modify import based on actual filestructure
// import {  } from '****/actions/';

// Component Imports
import Rating from "./Rating";

const Product = ({ product }) => {
	// Assign state on a per-object basis
	const [obj, setObj] = useState(null);

	//TODO: If desired, destructure any state variables for ease of access

	// Run any setup code or per-render effects
	useEffect(() => {}, []);

	return (
		<Card className='my-3 p-3 rounded'>
			<a href={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</a>
			<Card.Body>
				<a href={`/product/${product._id}`}>
					<Card.Title as='div'>
						<strong>{product.name}</strong>
					</Card.Title>
				</a>
				<Card.Text as='div'>
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					/>
				</Card.Text>
				<Card.Text as='h3'>${product.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

// TODO: Assign PropTypes per prop
Product.propTypes = {
	// :
};

// TODO: Update with appropriate state mapping
const mapStateToProps = (state) => ({
	// : state.
});

// TODO: Add any actions to the dispatch to ensure that Redux state updates can be accessed by the com
const mapDispatchToProps = {};

// Connect the Redux store to the Product component
export default connect(mapStateToProps, mapDispatchToProps)(Product);
