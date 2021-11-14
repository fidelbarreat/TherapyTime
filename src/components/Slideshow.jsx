import React, {useRef, useEffect, useCallback} from 'react';
import img1 from './../images/first-slideshow-1.jpg';
import img2 from './../images/first-slideshow-2.jpg';
import img3 from './../images/first-slideshow-3.jpg';
import img4 from './../images/first-slideshow-4.jpg';
import {ReactComponent as LeftArrow} from './../images/left-arrow.svg';
import {ReactComponent as RightArrow} from './../images/right-arrow.svg';
import styled from 'styled-components';

const Slideshow = ({
		children,
		controles = false,
		autoplay = false,
		velocidad: velocity="500",
		intervalo="5000"
	}) => {
	const slideshow = useRef(null);
	const intervaloSlideshow = useRef(null);

	const next = useCallback(() => {
		
		if(slideshow.current.children.length > 0){
			const firstElement = slideshow.current.children[0];
			slideshow.current.style.transition = `${velocity}ms ease-out all`;
			const slideSize = slideshow.current.children[0].offsetWidth;
			slideshow.current.style.transform = `translateX(-${slideSize}px)`;

			const transition = () => {
				slideshow.current.style.transition = 'none';
				slideshow.current.style.transform = `translateX(0)`;
				slideshow.current.appendChild(firstElement);
				slideshow.current.removeEventListener('transitionend', transition);
			}

			// Eventlistener when animation is done
			slideshow.current.addEventListener('transitionend', transition);

		}
	}, [velocity]);
	
	const before = () => {
		if(slideshow.current.children.length > 0){
			// Last element of slideshow
			const index = slideshow.current.children.length - 1;
			const ultimoElemento = slideshow.current.children[index];
			slideshow.current.insertBefore(ultimoElemento, slideshow.current.firstChild);
			
			slideshow.current.style.transition = 'none';
			const tamañoSlide = slideshow.current.children[0].offsetWidth;
			slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;
		
			setTimeout(() => {
				slideshow.current.style.transition = `${velocity}ms ease-out all`;
				slideshow.current.style.transform = `translateX(0)`;
			}, 30);
		}
	}

	useEffect(() => {
		if(autoplay){
			intervaloSlideshow.current = setInterval(() => {
				next();
			}, intervalo);

			slideshow.current.addEventListener('mouseover', () => {
				clearInterval(intervaloSlideshow.current);
			});

			slideshow.current.addEventListener('mouseleave', () => {
				intervaloSlideshow.current = setInterval(() => {
					next();
				}, intervalo);
			});
		}
	}, [autoplay, intervalo, next]);

	return (
		<ContenedorPrincipal>
			<ContenedorSlideshow ref={slideshow}>
				<Slide>
					<img src={img1} alt=""/>
					<TextSlide>
						<p>La salud es la mayor posesión. La alegría es el mayor tesoro. La confianza es el mayor amigo (Lao Tzu)</p>
					</TextSlide>
				</Slide>
				<Slide>
						<img src={img2} alt=""/>
						<TextSlide>
							<p>La primera riqueza es la salud (Ralph Waldo Emerson)</p>
						</TextSlide>
					</Slide>
					<Slide>
						<img src={img3} alt=""/>
						<TextSlide>
							<p>De nuestras vulnerabilidades vienen nuestras fortalezas (Sigmund Freud)</p>
						</TextSlide>
					</Slide>
					<Slide>
						<img src={img4} alt=""/>
						<TextSlide>
							<p>A terapia no va quien tiene problemas,</p>
							<p>a terapia va quien quiere solucionarlos</p>
						</TextSlide>
					</Slide>
			</ContenedorSlideshow>
			{controles && <Controls>
				<Boton onClick={before}>
					<LeftArrow />
				</Boton>
				<Boton derecho onClick={next}>
					<RightArrow />
				</Boton>
			</Controls>}
		</ContenedorPrincipal>
	);
}

const ContenedorPrincipal = styled.div`
	position: relative;
`;

const ContenedorSlideshow = styled.div`
	display: flex;
	flex-wrap: nowrap;
`;

const Slide = styled.div`
	min-width: 100%;
	overflow: hidden;
	transition: .3s ease all;
	z-index: 10;
	position: relative;

	img {
		width: 100%;
		vertical-align: top;
	}
`;

const TextSlide = styled.div`
	background: ${props => props.backgroundColor ? props.backgroundColor : 'rgba(0,0,0,.3)'};
	color: ${props => props.textColor ? props.textColor : '#fff'};
	width: 100%;
	padding: 10px 60px;
	text-align: center;
	position: absolute;
	bottom: 0;

	@media screen and (max-width: 700px) {
		position: relative;
		background: #000;
	}
`;

const Controls = styled.div`
	position: absolute;
	top: 0;
	z-index: 20;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

const Boton = styled.button`
	pointer-events: all;
	background: none;
	border: none;
	cursor: pointer;
	outline: none;
	width: 50px;
	height: 100%;
	text-align: center;
	position: absolute;
	transition: .3s ease all;
	&:hover {
		background: rgba(0,0,0,.2);
		path {
			fill: #fff;
		}
	}

	path {
		filter: ${props => props.derecho ? 'drop-shadow(-2px 0px 0px #fff)' : 'drop-shadow(2px 0px 0px #fff)'};
	}

	${props => props.derecho ? 'right: 0' : 'left: 0'}
`;

export default Slideshow;