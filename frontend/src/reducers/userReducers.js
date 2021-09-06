import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
} from "../actions/types";

export const userLoginReducer = (
	state = {
		products: [],
	},
	{ type, payload }
) => {
	switch (type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { ...state, loading: false, userInfo: payload };
		case USER_LOGIN_FAIL:
			return { ...state, loading: false, error: payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userLogoutReducer = (
	state = {
		product: {
			reviews: [],
		},
	},
	{ type, payload }
) => {
	switch (type) {
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};
