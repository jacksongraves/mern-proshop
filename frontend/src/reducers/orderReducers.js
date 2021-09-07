import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
} from "../actions/types";

export const orderCreateReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true };
		case ORDER_CREATE_SUCCESS:
			return { success: true, loading: false, order: payload };
		case ORDER_CREATE_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};
