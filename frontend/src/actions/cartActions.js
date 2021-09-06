// API imports
import axios from "axios";

// Constants for Redux
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
} from "./types.js";

// TODO: Comments
export const addToCart =
	({ id, qty }) =>
	async (dispatch, getState) => {
		try {
			// Flag that we are making a request
			// dispatch({ type: PRODUCT_LIST_REQUEST });

			// Make the request
			const { data } = await axios.get(`/api/products/${id}`);

			// Dispatch an add item request
			dispatch({
				type: CART_ADD_ITEM,
				payload: {
					product: data._id,
					name: data.name,
					image: data.image,
					price: data.price,
					countInStock: data.countInStock,
					qty,
				},
			});

			// We want to persist the cart somewhat, so write it to localStorage
			localStorage.setItems(
				"cartItems",
				JSON.stringify(getState().cart.cartItems)
			);
		} catch (error) {
			// Dispatch an error message
			// dispatch({
			// 	type: PRODUCT_LIST_FAIL,
			// 	payload: error?.response?.data?.message || error?.message || error,
			// });
		}
	};

// TODO: Comments
export const removeItemFromCart =
	({ id }) =>
	async (dispatch, getState) => {
		// const { stateParam } = getState().stateParam;
		// TODO: Modify with the correct endpoint
		// const response = await axios.get('/endpoint', { ...params, /* TODO */ });
		// TODO: Apply any transformations
		dispatch({ type: CART_REMOVE_ITEM, payload: id });

		// TODO: If using a history or redirects, apply it here
		// history.push('/');
		localStorage.setItem(
			"cartItems",
			JSON.stringify(getState().cart.cartItems)
		);
	};

// TODO: Comments
export const saveShippingAddress = (data) => async (dispatch, getState) => {
	// TODO: Apply any transformations
	dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });

	// TODO: If using a history or redirects, apply it here
	// history.push('/');
	localStorage.setItem("shippingAddress", JSON.stringify(data));
};
