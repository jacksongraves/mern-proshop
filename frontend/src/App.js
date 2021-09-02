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

// Functional arrow component setup
const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Header />
				<main className='py-3'>
					<Container>
						<Route path='/' exact component={HomeScreen} />
						<Route path='/product/:id' exact component={ProductScreen} />
					</Container>
				</main>
				<Footer />
			</Router>
		</Provider>
	);
};

export default App;
