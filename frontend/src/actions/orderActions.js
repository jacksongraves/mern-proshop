// API imports
import axios from "axios";

// Constants for Redux
import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_RESET,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_SUCCESS,
} from "./types.js";

// TODO: Comments
export const createOrder = (order) => async (dispatch, getState) => {
	try {
		const {
			userLogin: { userInfo },
		} = getState();

		// Flag that we are making a request
		dispatch({ type: ORDER_CREATE_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		// Make the request
		const { data } = await axios.post("/api/orders/", order, config);

		// Dispatch a successful request
		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
	} catch (error) {
		// Dispatch an error message
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: error?.response?.data?.message || error?.message || error,
		});
	}
};

// TODO: Comments
export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		const {
			userLogin: { userInfo },
		} = getState();

		// Flag that we are making a request
		dispatch({ type: ORDER_DETAILS_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		// Make the request
		const { data } = await axios.get(`/api/orders/${id}`, config);

		// Dispatch a successful request
		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		// Dispatch an error message
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: error?.response?.data?.message || error?.message || error,
		});
	}
};

// TODO: Comments
export const payOrder =
	({ id, paymentResult }) =>
	async (dispatch, getState) => {
		try {
			const {
				userLogin: { userInfo },
			} = getState();

			// Flag that we are making a request
			dispatch({ type: ORDER_PAY_REQUEST });

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			// Make the request
			const { data } = await axios.put(
				`/api/orders/${id}/pay`,
				paymentResult,
				config
			);

			// Dispatch a successful request
			dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
		} catch (error) {
			// Dispatch an error message
			dispatch({
				type: ORDER_PAY_FAIL,
				payload: error?.response?.data?.message || error?.message || error,
			});
		}
	};

// TODO: Comments
export const listMyOrders = () => async (dispatch, getState) => {
	try {
		const {
			userLogin: { userInfo },
		} = getState();

		// Flag that we are making a request
		dispatch({ type: ORDER_LIST_MY_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		// Make the request
		const { data } = await axios.get(`/api/orders/myorders`, config);

		// Dispatch a successful request
		dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
	} catch (error) {
		// Dispatch an error message
		dispatch({
			type: ORDER_LIST_MY_FAIL,
			payload: error?.response?.data?.message || error?.message || error,
		});
	}
};
