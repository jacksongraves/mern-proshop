// React Imports
import React, { Fragment, useState, useEffect } from "react";
// import { Router, Route, Link, Switch } from "react-router-dom";
// import PropTypes from "prop-types";

// Redux Imports
import { connect } from "react-redux";
// import { Field, reduxForm } from 'redux-form';
// TODO: Modify import based on actual filestructure
// import {  } from '****/actions/';

// react-bootstrap imports
import { Row, Col } from "react-bootstrap";

// Other Useful (API) imports
import axios from "axios";

// Component Imports
import Product from "../components/Product";

// Data Imports: Redundant due to backend serving data
import products from "../products";

const HomeScreen = ({}) => {
	// Assign state on a per-object basis
	const [products, setProducts] = useState([]);

	//TODO: If desired, destructure any state variables for ease of access

	// Run any setup code or per-render effects
	useEffect(() => {
		// Preload all products from the API when loading the component
		// Note: Because we haven't yet integrated global state with Redux, this gets called every time we backtrack from a ProductScreen
		const fetchProducts = async () => {
			// Note: destructuring response into { data } could cause an error if we get a non-200 HTTP response
			const { data } = await axios.get("/api/products");

			setProducts(data);
		};

		fetchProducts();
	}, []);

	return (
		<Fragment>
			<h1>Latest Products</h1>
			<Row>
				{products.map((product) => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
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
