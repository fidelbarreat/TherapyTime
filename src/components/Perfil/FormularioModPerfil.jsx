import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from "../../utils/firebase-config";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import styled from 'styled-components';
import boy1 from '../../images/boy1.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var [values, setValues] = [{}, () => {}];

const FormularioModPerfil = () => {
	const docRef = db.collection("pacientes").doc(auth.currentUser.uid);

	[values, setValues] = useState({
		email: "",
		password: "",
		nombre: "",
		fecha_de_nacimiento: "",
		telefono: "",
		tipo_de_usuario: "",
	});

	useEffect(() => {
		docRef.get().then((doc) => {
			setValues(doc.data());
			console.log(values);
		});
	}, []);

	const handleOnChange = (event) => {
		const { value, name: inputName } = event.target;
		setValues({ ...values, [inputName]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			docRef.update(values);
			toast("¡Tus datos se han guardado exitosamente!");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<ProfileContainer>
			<Container>
				<Row>
					<Col sm={6}>
						<Card className="card">
							<Card.Body>
								<Card.Title>Perfil de Usuario</Card.Title>
								{/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
								<Card.Text>
									<Form className="form" onSubmit={handleSubmit}>
										<Form.Group className="mb-3" controlId="formBasicEmail2">
											<Form.Label>Correo: </Form.Label>
											<Form.Label>{values.email}</Form.Label>
										</Form.Group>

										<Form.Group className="mb-3" controlId="formBasicName2">
											<Form.Label>Nombre</Form.Label>
											<Form.Control
												className="name"
												type="text"
												id="nombre"
												placeholder="Ingrese su nombre"
												name="nombre"
												value={values.nombre}
												onChange={handleOnChange}
											/>
										</Form.Group>

										<Form.Group className="mb-3" controlId="formBasicDate2">
											<Form.Label>Fecha de nacimiento</Form.Label>
											<Form.Control
												className="date"
												type="date"
												id="fecha_de_nacimiento"
												placeholder="Ingrese su fecha de nacimiento"
												name="fecha_de_nacimiento"
												value={values.fecha_de_nacimiento}
												onChange={handleOnChange}
											/>
										</Form.Group>

										<Form.Group className="mb-3" controlId="formBasicPhone2">
											<Form.Label>Teléfono</Form.Label>
											<Form.Control
												className="phone"
												type="number"
												id="telefono"
												placeholder="Ingrese su telefono"
												name="telefono"
												value={values.telefono}
												onChange={handleOnChange}
											/>
										</Form.Group>

										<Form.Group className="mb-3" controlId="formBasicPacient2">
											<Form.Label>Tipo de Usuario </Form.Label>
											<br />
											<Form.Label>{values.tipo_de_usuario}</Form.Label>
										</Form.Group>

										<Button
											className="submitRegister"
											variant="primary"
											type="submit"
											onClick={handleSubmit}
										>
											Actualizar Cuenta
										</Button>
									</Form>
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col sm={6}>
					<img
												src={boy1}
												alt="" 
												width="50%"
											/>
					</Col>
				</Row>
			</Container>
		</ProfileContainer>
	);
};

const ProfileContainer = styled.div`
    margin-top: 80px;

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	input[type=number] {
		-moz-appearance: textfield;
	}

`;

export default FormularioModPerfil;
