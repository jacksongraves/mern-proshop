import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
} from "../actions/types";

const initialState = {
	products: [],
};

export const productListReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case PRODUCT_LIST_REQUEST:
			return { ...state, loading: true, products: [] };
		case PRODUCT_LIST_SUCCESS:
			return { ...state, loading: false, products: payload };
		case PRODUCT_LIST_FAIL:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};
