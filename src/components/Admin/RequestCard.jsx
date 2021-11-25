import React from "react";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";

import "./request.css";

const RequestCard = ({ request, onReject, onAccept }) => {
	return (
		<Container>
			<Row>
				<div className="request" key={request.email}>
					<Col sm={8}>
						<div className="request-info">
							<h3>{request.nombre}</h3>
							{request.file !== "" ? (
								<a href={request.file} download>
									Descargar Curriculum
								</a>
							) : (
								<h6>No existe Curriculum</h6>
							)}
						</div>
					</Col>
					<Col sm={4} className="text-right text-md-right">
						<div className="request-btns text-right text-md-right">
							<Button onClick={() => onAccept(request)}>✔️</Button>
							<Button onClick={() => onReject(request)}>❌</Button>
						</div>
					</Col>
				</div>
			</Row>
		</Container>
	);
};

export default RequestCard;
