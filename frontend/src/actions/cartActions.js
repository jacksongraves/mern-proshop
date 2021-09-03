// API imports
import axios from "axios";

// Constants for Redux
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./types.js";

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
