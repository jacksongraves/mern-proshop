// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// import { Field, reduxForm } from 'redux-form';
// import {  } from '../actions/';

// Bootstrap Imports
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";

// Other Useful (API) imports
import axios from "axios";

// Component Imports
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { listProductDetails } from "../actions/productActions";

// Data Imports: Redundant due to backend serving data
// import products from "../products";

const ProductScreen = ({ match }) => {
	const dispatch = useDispatch();

	// Destructure any state variables for ease of access
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	// Run any setup code or per-render effects
	useEffect(() => {
		console.log(match.params.id);
		dispatch(listProductDetails(match.params.id));
	}, [match]);

	return (
		<Fragment>
			<Link className='btn btn-dark my-3' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											<strong>
												{product.countInStock > 0 ? "In Stock" : "Out of Stock"}
											</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Button
										className='btn-block'
										type='button'
										disabled={product.countInStock <= 0}
									>
										Add to Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</Fragment>
	);
};

// TODO: Assign default props for the component
ProductScreen.defaultProps = {
	// : null,
};

// TODO: Assign PropTypes per prop
ProductScreen.propTypes = {
	// :
};

// Connect the Redux store to the ProductScreen component
export default ProductScreen;
