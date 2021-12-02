import React from "react";
import { Container, Row, Carousel, Card, CardGroup } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import "./specialists.css";
import girl1 from '../../../images/girl1.png';
import girl2 from '../../../images/girl2.png';
import girl3 from '../../../images/girl3.png';
import girl4 from '../../../images/girl4.png';
import girl5 from '../../../images/girl5.png';
import boy1 from '../../../images/boy1.png';

function Specialists() {
	const personas = {data: [[
		{
			name: "Trixie Tang",
			description:
				"Mi meta es poder ayudarte a solucionar todo aquello que te perturbe, brindándote las herramientas adecuadas para lograrlo. Juntos podremos construir las soluciones, me enfoco en el motivo de consulta y podré ayudarte a través de mi experiencia profesional.",
			rating: 5.0,
			img: girl1
			
		},
		{
			name: "Carol Federman",
			description:
				"Con mi experiencia profesional te podré ayudar a recuperar la estabilidad y tranquilidad que te ha quitado el motivo de la cita. Busco poder construir un espacio contigo en el que te sientas cómodo y en confianza en todo momento.",
			rating: 4.0,
			img: girl2
		},
		{
			name: "John Fitzer",
			description:
				"Como profesional de la salud, mi propuesta es ofrecerte un espacio libre de juicios y seguro. Intento descubrir tu verdadero ser, para así poder ayudarte a entender un poco más los procesos que atraviesas y la forma en la que los puedes resolver. ",
			rating: 4.5,
			img: boy1
		}],[
		{
			name: "Catrina Wilson",
			description:
				"Para mí es importante canalizar todos los sentimientos y emociones que puedas tener, es necesario que puedas expresarlo, es por esto, que con mi ayuda podremos trabajar para que te encuentres contigo mismo, para que manejes efectivamente tus relaciones personales encontrando estabilidad y tranquilidad.",
			rating: 5.0,
			img: girl3
		},
		{
			name: "Andrea Fitzer",
			description:
				" En mis consultas me gusta promover un espacio libre para hablar de cualquier tema que se te ocurra, conmigo podrás encontrar tú mismo las herramientas para salir de cualquier dolor, problema o situación que esté ocurriendo en tu vida. Mi gran experiencia me permite realizar estrategias para que puedas beneficiarte en cada aspecto de tu vida y que puedas tomar mejores decisiones. ",
			rating: 4.0,
			img: girl4
		},
		{
			name: "Miriam Rodríguez",
			description:
				"Mi objetivo principal es ayudarte a modificar tus pensamientos, a que tengas comportamientos y sentimientos positivos. Te enseñaré técnicas de mindfulness y te brindaré las herramientas para que puedas solucionar cualquier problema de forma efectiva. ",
			rating: 4.5,
			img: girl5
		},
	]]};

	return (
		<Container>
			<Row>
				<h2 className="misespecialistas">Especialistas más destacados</h2>
			</Row>
			<Row>
				<Carousel>
					<Carousel.Item>
						{/* <Row className="justify-content-md-center"> */}
						<CardGroup>
							{personas.data[0].map((persona) => {
								return (
									<Card className="specialist-card">
										<Card.Body>
											<img
												src={persona.img}
												alt="" 
												width="100%"
											/>
											<Card.Title>{persona.name}</Card.Title>
											<ReactStars
												count={5}
												value={persona.rating}
												isHalf={true}
												size={24}
												activeColor="#ffd700"
												edit={false}
											/>
											<Card.Text>{persona.description}</Card.Text>
										</Card.Body>
									</Card>
								);
							})}
						</CardGroup>
					</Carousel.Item>
					<Carousel.Item>
						{/* <Row className="justify-content-md-center"> */}
						<CardGroup>
							{personas.data[1].map((persona) => {
								return (
									<Card className="specialist-card">
										<Card.Body>
											<img
												src={persona.img}
												alt=""
												width="100%"
											/>
											<Card.Title>{persona.name}</Card.Title>
											<ReactStars
												count={5}
												value={persona.rating}
												isHalf={true}
												size={24}
												activeColor="#ffd700"
												edit={false}
											/>
											<Card.Text>{persona.description}</Card.Text>
										</Card.Body>
									</Card>
								);
							})}
						</CardGroup>
					</Carousel.Item>
				</Carousel>
			</Row>
		</Container>
	);
}

export default Specialists;
