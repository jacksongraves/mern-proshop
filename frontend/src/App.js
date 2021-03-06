// React Imports
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

// Redux Imports
import { Provider } from "react-redux";
import store from "./store";

// Bootstrap Imports
import { Container } from "react-bootstrap";

// Component imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";

// Functional arrow component setup
const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Header />
				<main className='py-3'>
					<Container>
						<Route
							path='/admin/user/:id/edit'
							exact
							component={UserEditScreen}
						/>
						<Route path='/admin/userlist' exact component={UserListScreen} />
						<Route path='/order/:id' exact component={OrderScreen} />
						<Route path='/placeorder' exact component={PlaceOrderScreen} />
						<Route path='/payment' exact component={PaymentScreen} />
						<Route path='/shipping' exact component={ShippingScreen} />
						<Route path='/profile' exact component={ProfileScreen} />
						<Route path='/login' exact component={LoginScreen} />
						<Route path='/register' exact component={RegisterScreen} />
						<Route path='/product/:id' exact component={ProductScreen} />
						<Route path='/cart/:id?' exact component={CartScreen} />
						<Route path='/' exact component={HomeScreen} />
					</Container>
				</main>
				<Footer />
			</Router>
		</Provider>
	);
};

export default App;
