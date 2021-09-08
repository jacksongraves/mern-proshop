import { combineReducers } from "redux";
import { cartReducer } from "./cartReducers";

import { productListReducer, productDetailsReducer } from "./productReducers";
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
} from "./userReducers";

import {
	orderCreateReducer,
	orderDetailsReducer,
	orderListMyReducer,
	orderPayReducer,
} from "./orderReducers";

export default combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderListMy: orderListMyReducer,
});
