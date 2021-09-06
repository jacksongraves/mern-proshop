// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// import { Field, reduxForm } from 'redux-form';
import { getUserDetails } from "../actions/userActions";

// Bootstrap Imports
import { Form, Button, Row, Col } from "react-bootstrap";

// Component Imports
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const ProfileScreen = ({ match, location, history }) => {
	// TODO: Assign state on a per-object basis
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	// Grab the dispatch for Redux hooks
	const dispatch = useDispatch();

	// TODO: If desired, destructure any state variables for ease of access
	const { loading, error, user } = useSelector((state) => state.userDetails);
	const { userInfo } = useSelector((state) => state.userLogin);

	// Run any setup code or per-render effects
	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		} else {
			if (!user?.name) {
				dispatch(getUserDetails("profile"));
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [history, userInfo, user]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			// @todo
			// dispatch(register({ name, email, password }));
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h1>Sign Up</h1>
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='confirmPassword'
							placeholder='Enter password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}></Col>
		</Row>
	);
};

// TODO: Assign default props for the component
ProfileScreen.defaultProps = {
	// : null,
};

// TODO: Assign PropTypes per prop
ProfileScreen.propTypes = {
	// :
};

// Connect the Redux store to the LoginScreen component
export default ProfileScreen;
