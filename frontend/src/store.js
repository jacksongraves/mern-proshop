import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// import setAuthToken from "./utils/setAuthToken";

// Grab some localStorage preloads for the initial state
const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

// Assign an initial state with some preloaded variables if available, localStorage, cookies, etc.
const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
	},
};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

// set up a store subscription listener
// to store the users token in localStorage

// initialize current state from redux store for subscription comparison
// preventing undefined error

// let currentState = store.getState();

// store.subscribe(() => {
// 	// keep track of the previous and current state to compare changes
// 	let previousState = currentState;
// 	currentState = store.getState();
// 	// if the token changes set the value in localStorage and axios headers
// 	if (previousState.auth.token !== currentState.auth.token) {
// 		const token = currentState.auth.token;
// 		setAuthToken(token);
// 	}
// });

export default store;
