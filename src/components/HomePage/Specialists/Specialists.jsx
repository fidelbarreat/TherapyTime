import React from "react";
import { Container, Row, Carousel, Card, CardGroup } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

function Specialists() {
	const personas = [
		{
			name: "Ana",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper",
			rating: 5.0,
		},
		{
			name: "Monica",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper",
			rating: 2.9,
		},
		{
			name: "Pedro",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper",
			rating: 4.5,
		},
	];

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
							{personas.map((persona) => {
								return (
									<Card style={{ margin: "1rem" }}>
										<Card.Body>
											<img
												src="https://www.herbazest.com/imgs/d/8/7/551784/pera.jpg"
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