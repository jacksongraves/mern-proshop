// React Imports
import React, { Fragment, useState, useEffect } from "react";
// import { Router, Route, Link, Switch } from "react-router-dom";
// import PropTypes from "prop-types";

// Redux Imports
import { connect, useDispatch, useSelector } from "react-redux";
// import { Field, reduxForm } from 'redux-form';
// TODO: Modify import based on actual filestructure
import { listProducts } from "../actions/productActions";

// react-bootstrap imports
import { Row, Col } from "react-bootstrap";

// Other Useful (API) imports
import axios from "axios";

// Component Imports
import Product from "../components/Product";

// Data Imports: Redundant due to backend serving data
import products from "../products";

const HomeScreen = ({}) => {
	// Make use of the Redux dispatch and global store
	const dispatch = useDispatch();

	//TODO: If desired, destructure any state variables for ease of access
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	// Run any setup code or per-render effects
	useEffect(() => {
		// Preload all products from the API when loading the component via Redux
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<Fragment>
			<h1>Latest Products</h1>
			{loading ? (
				<h1>LOADING</h1>
			) : error ? (
				<h1>{error}</h1>
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</Fragment>
	);
};

// TODO: Assign PropTypes per prop
HomeScreen.propTypes = {
	// :
};

// TODO: Update with appropriate state mapping
const mapStateToProps = (state) => ({
	// : state.
});

// TODO: Add any actions to the dispatch to ensure that Redux state updates can be accessed by the com
const mapDispatchToProps = {};

// Connect the Redux store to the HomeScreen component
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
