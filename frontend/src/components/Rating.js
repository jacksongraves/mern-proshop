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

const Rating = ({ value, text, color }) => {
	// TODO: Assign state on a per-object basis
	const [obj, setObj] = useState(null);

	// TODO: If desired, destructure any state variables for ease of access

	// Run any setup code or per-render effects
	useEffect(() => {}, []);

	return (
		<div className='rating'>
			<span>
				<i
					style={{ color }}
					className={
						value >= 1
							? "fas fa-star"
							: value >= 0.5
							? "fas fa-star-half-alt"
							: "far fa-star"
					}
				></i>
				<i
					style={{ color }}
					className={
						value >= 2
							? "fas fa-star"
							: value >= 1.5
							? "fas fa-star-half-alt"
							: "far fa-star"
					}
				></i>
				<i
					style={{ color }}
					className={
						value >= 3
							? "fas fa-star"
							: value >= 2.5
							? "fas fa-star-half-alt"
							: "far fa-star"
					}
				></i>
				<i
					style={{ color }}
					className={
						value >= 4
							? "fas fa-star"
							: value >= 3.5
							? "fas fa-star-half-alt"
							: "far fa-star"
					}
				></i>
				<i
					style={{ color }}
					className={
						value >= 5
							? "fas fa-star"
							: value >= 4.5
							? "fas fa-star-half-alt"
							: "far fa-star"
					}
				></i>
			</span>
			<span>{text && text}</span>
		</div>
	);
};

// TODO: Assign default props for the component
Rating.defaultProps = {
	color: "#f8e825",
};

// TODO: Assign PropTypes per prop
Rating.propTypes = {
	value: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	color: PropTypes.string,
};

// TODO: Update with appropriate state mapping
const mapStateToProps = (state) => ({
	// : state.
});

// TODO: Add any actions to the dispatch to ensure that Redux state updates can be accessed by the com
const mapDispatchToProps = {
	//
};

// Connect the Redux store to the Rating component
export default connect(mapStateToProps, mapDispatchToProps)(Rating);
