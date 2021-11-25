import React from "react";
import Slideshow from "../HomePage/Carousel/Slideshow";
import AboutUs from "../HomePage/AboutUs/AboutUs";
import Specialists from "../HomePage/Specialists/Specialists";
import Features from "../HomePage/Features/Features";
import "../HomePage/home.css";

export default function AdminHome(){

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