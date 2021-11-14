import React from 'react';
import Slideshow from './components/Slideshow'
import AboutUs from './components/AboutUs'
import './App.css';

const App = () => {
	return (
		<main>
			<Slideshow controles={true} autoplay={true} velocidad="3000" intervalo="10000"/>
			<AboutUs />	
		</main>
	);
}

export default App;