// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";

// react-boostrap imports
import { Navbar, Nav, Container } from "react-bootstrap";

// Redux Imports
import { connect } from "react-redux";
// import { Field, reduxForm } from "redux-form";
// TODO: Modify import based on actual filestructure
// import {  } from '****/actions/';

const Header = ({}) => {
	// Assign state on a per-object basis
	const [obj, setObj] = useState(null);

	//TODO: If desired, destructure any state variables for ease of access

	// Run any setup code or per-render effects
	useEffect(() => {}, []);

	return (
		<Fragment>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<Navbar.Brand href='/'>Proshop</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<Nav.Link href='/cart'>
								<i className='fas fa-shopping-cart'></i>Cart
							</Nav.Link>
							<Nav.Link href='/login'>
								<i className='fas fa-user'></i>Sign In
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</Fragment>
	);
};

// TODO: Assign PropTypes per prop
Header.propTypes = {
	// :
};

// TODO: Update with appropriate state mapping
const mapStateToProps = (state) => ({
	// : state.
});

// TODO: Add any actions to the dispatch to ensure that Redux state updates can be accessed by the component
const mapDispatchToProps = {};

// Connect the Redux store to the Header component
export default connect(mapStateToProps, mapDispatchToProps)(Header);
