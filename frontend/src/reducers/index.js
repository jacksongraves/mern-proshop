import { combineReducers } from "redux";
import { cartReducer } from "./cartReducers";

import { productListReducer, productDetailsReducer } from "./productReducers";
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
} from "./userReducers";

export default combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
});
