// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
// Redux Imports
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
// TODO: Modify import based on actual filestructure
// import {  } from '****/actions/';

const Footer = ({}) => {
	// Assign state on a per-object basis
	const [obj, setObj] = useState(null);

	//TODO: If desired, destructure any state variables for ease of access

	// Run any setup code or per-render effects
	useEffect(() => {}, []);

	return (
		<Fragment>
			<Container>
				<Row>
					<Col className='text-center py-3'>Copyright &copy; Proshop</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

// TODO: Assign PropTypes per prop
Footer.propTypes = {
	// :
};

// TODO: Update with appropriate state mapping
const mapStateToProps = (state) => ({
	// : state.
});

// TODO: Add any actions to the dispatch to ensure that Redux state updates can be accessed by the component
const mapDispatchToProps = {};

// Connect the Redux store to the Footer component
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
