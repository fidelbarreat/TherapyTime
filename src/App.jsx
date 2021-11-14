import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Slideshow from "./components/Slideshow";
import AboutUs from "./components/AboutUs";
import Specialists from "./HomePage/Specialists/Specialists";
import Features from "./HomePage/Features/Features";
import "./App.css";

const App = () => {
	return (
		<main>
				<Navbar />
				<Slideshow
					controles={true}
					autoplay={true}
					velocidad="3000"
					intervalo="10000"
				/>
        <section>
				<AboutUs />
        </section>
        <section>
				<Features />
        </section>
        <section>
				<Specialists />
        </section>
		</main>
	);
};

export default App;
