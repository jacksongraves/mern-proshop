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

// Functional arrow component setup
const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Header />
				<main className='py-3'>
					<Container>
						<Route path='/login' exact component={LoginScreen} />
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
