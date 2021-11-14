import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import Slideshow from './components/Slideshow'
import AboutUs from './components/AboutUs'
import './App.css';


const App = () => {
	return (
		<main>
			<Navbar />
			<Slideshow controles={true} autoplay={true} velocidad="3000" intervalo="10000"/>
			<AboutUs />	
		</main>
	);
}

export default App;
