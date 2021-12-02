import React from "react";
import { useState, useEffect } from "react";
import { auth, db, st } from "../../utils/firebase-config";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import styled from 'styled-components';
import boy1 from '../../images/boy1.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { UserContext } from "../UserContext";

toast.configure();
var [values, setValues] = [{}, () => {}];

const FormularioModPerfil = () => {

	const { user, setUser } = useContext(UserContext);
	const [image, setImage] = useState();
	const [url, setUrl] = useState();
	const [values, setValues] = useState({
		email: "",
		password: "",
		nombre: "",
		fecha_de_nacimiento: "",
		telefono: "",
		tipo_de_usuario: "",
		file: "",
		profile_pic: "",
		especialidad: "",
		rating: 0,
		citas: [],
		biografia: "",
		cant_rating: 0
	});

	useEffect(() => {
		if(user.tipo_de_usuario === "Especialista"){
			const docRef = db.collection("especialistas_pendientes").doc(auth.currentUser.uid);
			docRef.get().then((doc) => {
				if(doc.data() === undefined){
					const docRef = db.collection("especialistas").doc(auth.currentUser.uid);
					docRef.get().then((doc) => {
						setValues(doc.data());
					});
				}	else{
					docRef.get().then((doc) => {
						setValues(doc.data());
						console.debug(values);
					});
				}
			});
					
		}	else if(user.tipo_de_usuario === "Paciente"){
				const docRef = db.collection("pacientes").doc(auth.currentUser.uid);
				docRef.get().then((doc) => {
				setValues(doc.data());
				console.debug(values);
			});

		}	

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

		if(user.tipo_de_usuario === "Especialista"){
					const docRef = db.collection("especialistas_pendientes").doc(auth.currentUser.uid);
					docRef.get().then((doc) => {
						if(doc.data() === undefined){
							const docRef = db.collection("especialistas").doc(auth.currentUser.uid);
							docRef.update(values);
							toast("¡Tus datos se han guardado exitosamente!");
						}	else{
							docRef.update(values);
							toast("¡Tus datos se han guardado exitosamente!");
						}
					});				
		}	else if(user.tipo_de_usuario === "Paciente"){
			try {
				const docRef = db.collection("pacientes").doc(auth.currentUser.uid);
				docRef.update(values);
				toast("¡Tus datos se han guardado exitosamente!");
			} catch (error) {
				console.log(error.message);
			}
		}
		
	};
	
	const handleUpload = async (e) => {
		try{
			const uploadTask = st.ref().child(`profile_pics/${image.name}`);
			await uploadTask.put(image);
			const urlFile = await uploadTask.getDownloadURL();
			setValues({ ...values, profile_pic: urlFile });
		} catch{
			toast('Imagen inválida.')
		}
		
	};

	return (
		<ProfileContainer>
			<Container className="text-center justify-content mt-5">
				<Row>
					<h1>Chats</h1>
					<Col sm={6}>
						<Card className="card">
							<Card.Body className="cardperfil">
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

										<Form.Group className="mb-1" controlId="formBasicFile">
											<div
												className={`App ${
													values?.tipo_de_usuario !== "Especialista"
														? "invisible"
														: "visible"
												}`}
											>
												<Form.Label>
													Especialidad
												</Form.Label>
												<Form.Control
													className="especialidad"
													type="text"
													id="especialidad"
													name="especialidad"
													value={values.especialidad}
													readOnly
												/>
											</div>
										</Form.Group>

										<Form.Group className="mb-3" controlId="formBasicBiography2">
											<Form.Label>Biografía</Form.Label>
											<Form.Control
												className="bio"
												as="textarea"
												id="biografia"
												placeholder="Ingrese una breve descripción suya"
												name="biografia"
												value={values.biografia}
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
