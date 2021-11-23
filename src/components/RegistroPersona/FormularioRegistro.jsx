import React from "react";
import { useState } from "react";
import { auth, db, st } from "../../utils/firebase-config";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Card, Col, Row } from "react-bootstrap";
import image from "../../images/register.png";
import "./FormularioRegistro.css";
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
function FormularioRegistro() {

	const history = useHistory();
	const [values, setValues] = useState({
		email: "",
		password: "",
		nombre: "",
		fecha_de_nacimiento: "",
		telefono: "",
		tipo_de_usuario: "",
		file: ""
	});

	const handleOnFile = async (e) => {
		try {
			const archivolocal = e.target.files[0];
			const currRef = st.ref().child(`curriculums/${archivolocal.name}`);
			await currRef.put(archivolocal);
			const urlFile = await currRef.getDownloadURL();
			setValues({ ...values, file: urlFile });
		} catch (error) {
			console.log(error.message);
		}
	};


	return (

		<>

		<Container className="containerForm align-middle">
			<Row>
				<Col sm={6}>
					<Card className="card">
						<Card.Body>
							<Card.Title>Registro</Card.Title>
							{/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
							<Card.Text>
								
								<Formik	
       								initialValues={{ email: "",
									   password: "",
									   nombre: "",
									   fecha_de_nacimiento: "",
									   telefono: "",
									   tipo_de_usuario: "",
									   file: "",
									   especialidad: "",
									   rating: ""
 										}}

       								validate={values => {
         							const errors = {};
         							if (!values.email) {
           								errors.email = 'Campo requerido';
         							} else if (
           								!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         							) {
           								errors.email = 'Dirección de correo inválido';
         							}

									if (!values.password) {
									errors.password = 'Campo requerido';
									} else if (
										!/^.{8,12}$/i.test(values.password)
									) {
										errors.password = 'Entre 8 y 12 caracteres';
									}
							
									if (!values.telefono) {
										errors.telefono = 'Campo requerido';
									} else if (
										!/^.{10}$/i.test(values.telefono)
									) {
										errors.telefono = 'Numero de teléfono inválido';
									}

									if (!values.nombre) {
										errors.nombre = 'Campo requerido';
								  	} else if (
										!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/i.test(values.nombre)
								  	) {
										errors.nombre = 'Nombre inválido';
								  	}
							
									if (!values.fecha_de_nacimiento) {
										errors.fecha_de_nacimiento = 'Campo requerido';
								  	}
									
									if (!values.tipo_de_usuario) {
										errors.tipo_de_usuario = 'Campo requerido';
								  	}

									if (!values.especialidad) {
										errors.especialidad = 'Campo requerido';
								  	}

									return errors;
       								}}

								   
       							onSubmit={ async (values, { setSubmitting }) => {

									try {
										const response = await auth.createUserWithEmailAndPassword(
											values.email,
											values.password)

											if (values.tipo_de_usuario == "Especialista") {
												try {
												db.collection("especialistas_pendientes")
													.doc(response.user.uid)
													.set(values)
													.catch((err) => {
														console.log(err);
													});
												} catch (error) {
													console.log(error.message);
												}
												
												toast('Registro exitoso.')
												history.push("/");
												setSubmitting(false);
												
											} else if (values.tipo_de_usuario == "Paciente") {
	
												try {
													db.collection("pacientes")
														.doc(response.user.uid)
														.set(values)
														.catch((err) => {
															console.log(err);
														});
												} catch (error) {
													console.log(error.message);
												}

												toast('Registro exitoso.')
												history.push("/");
												setSubmitting(false);						
												}

										} catch (error) {
											toast('Usuario existente')
										}
										
       									}}
     							>
									 
       							{({
         						values,
         						errors,
         						touched,
         						handleBlur,
								handleChange,
								isSubmitting,
								handleSubmit,
							
       							}) => (
								
								
								<Form className="form" onSubmit={handleSubmit}>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Correo</Form.Label>
										<Form.Control
											className="email"
											name="email"
											id="email"
											type="email"
											placeholder="Ingresa tu correo"
											value={values.email}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.email && touched.email && errors.email}

									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicPassword">
										<Form.Label>Contraseña</Form.Label>
										<Form.Control
											className="clave"
											name="password"
											id="password"
											type="password"
											placeholder="Ingresa tu contraseña"
											pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
											title="Por favor incluya al menos una mayúscula, una minúscula y un número."
											required
											value={values.password}
											onChange={handleChange}
           							 		onBlur={handleBlur}
										/>
										{errors.password && touched.password && errors.password}
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicPhone">
										<Form.Label>Teléfono</Form.Label>
										<Form.Control
											keyboardType="numeric"
											className="phone"
											type="number"
											id="telefono"
											placeholder="Ingrese su número telefónico"
											name="telefono"
											value={values.telefono}
											onChange={handleChange}
           							 		onBlur={handleBlur}
										/>
										{errors.telefono && touched.telefono && errors.telefono}
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicName">
										<Form.Label>Nombre</Form.Label>
										<Form.Control
											className="name"
											type="text"
											id="nombre"
											placeholder="Ingrese su nombre"
											name="nombre"
											value={values.nombre}
											onChange={handleChange}
           							 		onBlur={handleBlur}
										/>
										{errors.nombre && touched.nombre && errors.nombre}
									</Form.Group>

									

									<Form.Group className="mb-3" controlId="formBasicDate">
										<Form.Label>Fecha de nacimiento</Form.Label>
										<Form.Control
											className="date"
											type="date"
											id="fecha_de_nacimiento"
											name="fecha_de_nacimiento"
											value={values.fecha_de_nacimiento}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.fecha_de_nacimiento && touched.fecha_de_nacimiento && errors.fecha_de_nacimiento}
									</Form.Group>

									<Form.Group className="mb-2" controlId="formBasicSpecialist">
										<Form.Label>Especialista</Form.Label>
										<Form.Check
											className="specialist"
											type="radio"
											id="especialista"
											name="tipo_de_usuario"
											value="Especialista"
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.tipo_de_usuario && touched.tipo_de_usuario && errors.tipo_de_usuario}
									</Form.Group>

									<Form.Group className="mb-2" controlId="formBasicPacient">
										<Form.Label>Paciente</Form.Label>
										<Form.Check
											className="pacient"
											type="radio"
											id="paciente"
											name="tipo_de_usuario"
											value="Paciente"
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.tipo_de_usuario && touched.tipo_de_usuario && errors.tipo_de_usuario}
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
												Suba su curriculum en formato .pdf
											</Form.Label>
											<Form.Control
												className="file"
												type="file"
												id="file"
												accept=".pdf"
												name="file"
												onChange={handleOnFile}
												onBlur={handleBlur}
											/>

										<br/>
										<Form.Label>Especialidad</Form.Label>
										<br/>
										<br/>
										<Form.Group className="mb-2" controlId="formBasicSpecialist">
											<Form.Label>Psicología cognitiva</Form.Label>
											<Form.Check
												className="psicología cognitiva"
												type="radio"
												id="psicología cognitiva"
												name="especialidad"
												value="psicología cognitiva"
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											{errors.especialidad && touched.especialidad && errors.especialidad}
										</Form.Group>

										<Form.Group className="mb-2" controlId="formBasicSpecialist">
											<Form.Label>Neuropsicología</Form.Label>
											<Form.Check
												className="neuropsicología"
												type="radio"
												id="neuropsicología"
												name="especialidad"
												value="neuropsicología"
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											{errors.especialidad && touched.especialidad && errors.especialidad}
										</Form.Group>

										<Form.Group className="mb-2" controlId="formBasicSpecialist">
											<Form.Label>Psicología clínica</Form.Label>
											<Form.Check
												className="psicología clínica"
												type="radio"
												id="psicología clínica"
												name="especialidad"
												value="psicología clínica"
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											{errors.especialidad && touched.especialidad && errors.especialidad}
										</Form.Group>

										<Form.Group className="mb-2" controlId="formBasicSpecialist">
											<Form.Label>Psicología evolutiva</Form.Label>
											<Form.Check
												className="psicología evolutiva"
												type="radio"
												id="psicología evolutiva"
												name="especialidad"
												value="psicología evolutiva"
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											{errors.especialidad && touched.especialidad && errors.especialidad}
										</Form.Group>
										</div>	
									</Form.Group>
									
									<br/>
									<Button
										disabled={isSubmitting}
										className="submitRegister"
										variant="primary"
										type="submit"
									>
										Crear
									</Button>


								</Form>

       							)}
     							</Formik>	
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col sm={6}>
					<img src={image} alt="" width="100%"/>
				</Col>
			</Row>
		</Container>

		</>

	);
}

export default FormularioRegistro;
