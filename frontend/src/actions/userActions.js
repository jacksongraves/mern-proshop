// API imports
import axios from "axios";

// Constants for Redux
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_RESET,
	USER_DETAILS_FAIL,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_FAIL,
	ORDER_LIST_MY_RESET,
} from "./types.js";

// TODO: Comments
export const login =
	({ email, password }) =>
	async (dispatch, getState) => {
		try {
			// Flag that we are making a request
			dispatch({ type: USER_LOGIN_REQUEST });

			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			// Make the request
			const { data } = await axios.post(
				"/api/users/login",
				{ email, password },
				config
			);

			// Dispatch a successful request
			dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

			localStorage.setItem("userInfo", JSON.stringify(data));
		} catch (error) {
			// Dispatch an error message
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: error?.response?.data?.message || error?.message || error,
			});
		}
	};

export const logout = () => async (dispatch, getState) => {
	localStorage.removeItem("userInfo");
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: ORDER_LIST_MY_RESET });
};

export const register =
	({ name, email, password }) =>
	async (dispatch, getState) => {
		try {
			// Flag that we are making a request
			dispatch({ type: USER_REGISTER_REQUEST });

			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			// Make the request
			const { data } = await axios.post(
				"/api/users",
				{ name, email, password },
				config
			);

			// Dispatch a successful request
			dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
			dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

			localStorage.setItem("userInfo", JSON.stringify(data));
		} catch (error) {
			// Dispatch an error message
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: error?.response?.data?.message || error?.message || error,
			});
		}
	};

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		const {
			userLogin: { userInfo },
		} = getState();

		// Flag that we are making a request
		dispatch({ type: USER_DETAILS_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		// Make the request
		const { data } = await axios.get(`/api/users/${id}`, config);

		// Dispatch a successful request
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		// Dispatch an error message
		dispatch({
			type: USER_DETAILS_FAIL,
			payload: error?.response?.data?.message || error?.message || error,
		});
	}
};

// @param user object
export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		const {
			userLogin: { userInfo },
		} = getState();

		// Flag that we are making a request
		dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		// Make the request
		const { data } = await axios.put(`/api/users/profile`, user, config);

		// Dispatch a successful request
		dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
	} catch (error) {
		// Dispatch an error message
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload: error?.response?.data?.message || error?.message || error,
		});
	}
};
