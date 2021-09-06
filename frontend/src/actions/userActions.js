// API imports
import axios from "axios";

// Constants for Redux
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
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

			localStorage.setItem("userInfo", data);
		} catch (error) {
			// Dispatch an error message
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: error?.response?.data?.message || error?.message || error,
			});
		}
	};
