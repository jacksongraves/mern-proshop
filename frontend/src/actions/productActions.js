// API imports
import axios from "axios";

// Constants for Redux
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
} from "../constants/productConstants";

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
