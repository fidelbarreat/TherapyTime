import React from "react";
import { useState, useEffect } from "react";
import { auth, db, st } from "../../utils/firebase-config";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import styled from 'styled-components';
import boy1 from '../../images/boy1.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
var [values, setValues] = [{}, () => {}];

const FormularioModPerfil = () => {
	const docRef = db.collection("pacientes").doc(auth.currentUser.uid);

	const [image, setImage] = useState();
	const [url, setUrl] = useState();

	[values, setValues] = useState({
		email: "",
		password: "",
		nombre: "",
		fecha_de_nacimiento: "",
		telefono: "",
		tipo_de_usuario: "",
		file: "",
		profile_pic: "",
		description: "",
	});

	useEffect(() => {
		docRef.get().then((doc) => {
			setValues(doc.data());
			console.debug(values);
		});
	}, []);

	const handleOnChange = (event) => {
		const { value, name: inputName } = event.target;
		setValues({ ...values, [inputName]: value });
	};

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
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

	const handleUpload = async (e) => {
		const uploadTask = st.ref().child(`profile_pics/${image.name}`);
		await uploadTask.put(image);
		const urlFile = await uploadTask.getDownloadURL();
		setValues({ ...values, profile_pic: urlFile });
		// uploadTask.on(
		//   "state_changed",
		//   error => {
		// 	console.log(error);
		//   },
		//   () => {
		// 	st
		// 	  .ref("profile_pics")
		// 	  .child(image.name)
		// 	  .getDownloadURL()
		// 	  .then(url => {
		// 		setUrl(url);
		// 		// setValues({ ...values, profile_pic: url });
		// 		// docRef.update(values);
		// 		alert("¡Imagen guardada exitosamente!");
		// 	  });
		//   }
		// );
	};

	return (
		<ProfileContainer>
			<Container>
				<Row>
					<Col sm={6}>
						<Card className="card">
							<Card.Body>
								<Card.Title>Perfil de Usuario</Card.Title>
								<Card.Text>
									<Form className="form" onSubmit={handleSubmit}>
										<Form.Group className="mb-3" controlId="formBasicEmail2">
											<Form.Label for="email">
												Correo:
											</Form.Label>
											<Form.Control
												className="email"
												type="text"
												id="email"
												placeholder="Ingrese su email"
												name="email"
												value={values.email}
												readOnly
											/>
										</Form.Group>

										<Form.Group className="mb-3" controlId="formBasicName2">
											<Form.Label for="nombre">Nombre</Form.Label>
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

										<Form.Group className="mb-3" controlId="formBasicBiography2">
											<Form.Label>Biografía</Form.Label>
											<Form.Control
												className="bio"
												as="textarea"
												id="biografia"
												placeholder="Ingrese una breve descripción suya"
												name="biografia"
												value={values.description}
												onChange={handleOnChange}
											/>
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
					<Col sm={6} className="text-center justify-content">
						<img
							src={values.profile_pic || "http://via.placeholder.com/300"}
							alt="firebase-image"
							width="50%"
						/>
						<Form.Control type="file" onChange={handleChange} className="inputFotoPerfil"/>
						<Button onClick={handleUpload} className="buttonFotoPerfil">Upload</Button>
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

	.inputFotoPerfil {
		margin: 20px;
	}

	.buttonFotoPerfil {
		padding: 5px 40px;
	}

	input[type="number"] {
		-moz-appearance: textfield;
	}
`;

export default FormularioModPerfil;
