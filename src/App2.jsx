import React from "react";
import Navbar from "./components/Navbar/Navbar";
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
