// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import { Field, reduxForm } from 'redux-form';
// import {  } from '../actions/';

// Component Imports
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = ({ match, location, history }) => {
	// TODO: Assign state on a per-object basis
	const dispatch = useDispatch();

	// TODO: If desired, destructure any state variables for ease of access
	const { loading, error, users } = useSelector((state) => state.userList);
	const { userInfo } = useSelector((state) => state.userLogin);
	// Run any setup code or per-render effects
	useEffect(() => {
		if (userInfo?.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push("/login");
		}
	}, [dispatch, history, userInfo]);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteUser(id));
		}
	};

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
						</tr>
					</thead>
					<tbody>
						{users?.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<i className='fas fa-check' style={{ color: "green" }}></i>
									) : (
										<i className='fas fa-times' style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler(user._id)}
									>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

// TODO: Assign default props for the component
UserListScreen.defaultProps = {
	// : null,
};

// TODO: Assign PropTypes per prop
UserListScreen.propTypes = {
	// :
};

// Connect the Redux store to the UserListScreen component
export default UserListScreen;
