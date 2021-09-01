import React, { Fragment } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
// Component imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store";
// Functional arrow component setup
const App = () => {
	return (
		<Provider store={store}>
			<Fragment>
				<Header />
				<main className='py-3'>
					<Container>Welcome to Proshop</Container>
				</main>
				<Footer />
			</Fragment>
		</Provider>
	);
};

export default App;
