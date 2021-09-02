// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";

// Redux Imports
import { connect } from "react-redux";
// import { Field, reduxForm } from 'redux-form';
// import {  } from '../actions/';

// Bootstrap Imports
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";

// Component Imports
import Rating from "../components/Rating";

// Data Imports
import products from "../products";

const ProductScreen = ({ match }) => {
	// TODO: Assign state on a per-object basis
	const [obj, setObj] = useState(null);

	const product = products.find((p) => p._id === match.params.id);
	console.log(product);

	// TODO: If desired, destructure any state variables for ease of access

	// Run any setup code or per-render effects
	useEffect(() => {}, []);

	return (
		<Fragment>
			<Link className='btn btn-dark my-3' to='/'>
				Go Back
			</Link>
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
						<ListGroup.Item>Description: {product.description}</ListGroup.Item>
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

// TODO: Update with appropriate state mapping
const mapStateToProps = (state) => ({
	// : state.
});

// TODO: Add any actions to the dispatch to ensure that Redux state updates can be accessed by the com
const mapDispatchToProps = {
	//
};

// Connect the Redux store to the ProductScreen component
export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
