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
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper",
			rating: 5.0,
			img: girl1
		},
		{
			name: "Carol Federman",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper",
			rating: 4.0,
			img: girl2
		},
		{
			name: "John Fitzer",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper",
			rating: 4.5,
			img: boy1
		}],[
		{
			name: "Catrina Wilson",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper",
			rating: 5.0,
			img: girl3
		},
		{
			name: "Andrea Fitzer",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper",
			rating: 4.0,
			img: girl4
		},
		{
			name: "Miriam Rodríguez",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper",
			rating: 4.5,
			img: girl5
		},
	]]};

	return (
		<Container>
			<Row>
				<h2>Especialistas más destacados</h2>
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
