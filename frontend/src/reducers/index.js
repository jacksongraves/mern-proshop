import { combineReducers } from "redux";
import { cartReducer } from "./cartReducers";

import { productListReducer, productDetailsReducer } from "./productReducers";
import {
	userLoginReducer,
	userLogoutReducer,
	userRegisterReducer,
} from "./userReducers";
// import alert from "./alert";
// import auth from "./auth";
// import profile from "./profile";
export default combineReducers({
	// alert,
	// auth,
	// profile,
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
});
