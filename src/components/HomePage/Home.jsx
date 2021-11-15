import React from "react";
import Slideshow from "./Carousel/Slideshow";
import AboutUs from "./AboutUs/AboutUs";
import Specialists from "./Specialists/Specialists";
import Features from "./Features/Features";
import "./home.css";

export default function Home(){

    return(
      <main>
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
        
    )
}



