import { combineReducers } from "redux";

import { productListReducer, productDetailsReducer } from "./productReducers";
// import alert from "./alert";
// import auth from "./auth";
// import profile from "./profile";
export default combineReducers({
	// alert,
	// auth,
	// profile,
	productList: productListReducer,
	productDetails: productDetailsReducer,
});
