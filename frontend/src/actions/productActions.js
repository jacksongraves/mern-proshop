// API imports
import axios from "axios";

// Constants for Redux
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from "./types.js";

// TODO: Comments
export const listProducts = (params) => async (dispatch, getState) => {
	try {
		// Flag that we are making a request
		dispatch({ type: PRODUCT_LIST_REQUEST });

		// Make the request
		const { data } = await axios.get("/api/products");

		// Dispatch a successful request
		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		// Dispatch an error message
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload: error?.response?.data?.message || error?.message || error,
		});
	}
};

// TODO: Comments
export const listProductDetails = (id) => async (dispatch, getState) => {
	try {
		// Flag that we are making a request
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		// Make the request
		const { data } = await axios.get(`/api/products/${id}`);

		// Dispatch a successful request
		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		// Dispatch an error message
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error?.response?.data?.message || error?.message || error,
		});
	}
};
