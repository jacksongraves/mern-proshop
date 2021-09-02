// React Imports
import React, { Fragment } from "react";
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

// Functional arrow component setup
const App = () => {
	return (
		<Provider store={store}>
			<Header />
			<main className='py-3'>
				<Container>
					<HomeScreen />
				</Container>
			</main>
			<Footer />
		</Provider>
	);
};

export default App;
