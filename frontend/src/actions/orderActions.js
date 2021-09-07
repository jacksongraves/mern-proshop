// API imports
import axios from "axios";

// Constants for Redux
import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
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
