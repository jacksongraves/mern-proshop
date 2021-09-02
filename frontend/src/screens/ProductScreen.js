// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";

// Redux Imports
import { connect } from "react-redux";
// import { Field, reduxForm } from 'redux-form';
// import {  } from '../actions/';

// Component Imports
// import Component from './Component';

const ProductScreen = ({}) => {
	// TODO: Assign state on a per-object basis
	const [obj, setObj] = useState(null);

	// TODO: If desired, destructure any state variables for ease of access

	// Run any setup code or per-render effects
	useEffect(() => {}, []);

	return <Fragment></Fragment>;
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
