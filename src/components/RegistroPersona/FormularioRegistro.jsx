import React from "react";
import { useState } from "react";
import { auth, db, st } from "../../utils/firebase-config";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Card, Col, Row } from "react-bootstrap";
import image from "../../images/register.png";
import "./FormularioRegistro.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function FormularioRegistro() {
	const history = useHistory();
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
		rating: "",
		citas: [],
		biografia: "",
		isOnline: true,
	});
	const [form, setForm] = useState({});
	const [errors, setErrors] = useState({});

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

	const handleOnChange = (e) => {
		const { value, name: inputName } = e.target;
		setValues({ ...values, [inputName]: value });
		setField(inputName, e.target.value);
	};

	const {
		email,
		password,
		nombre,
		fecha_de_nacimiento,
		telefono,
		tipo_de_usuario,
		file,
		especialidad,
		rating,
		citas,
		biografia,
		isOnline,
	} = values;

	const findFormErrors = () => {
		const { email, nombre, password, fecha_de_nacimiento, telefono, paciente, especialista, especialidad } = form;
		const newErrors = {};
		console.debug();
		// name errors
		if (!email || email === "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) newErrors.email = "Dirección de correo inválido";
		// else if ( name.length > 30 ) newErrors.name = 'name is too long!'
		// // food errors
		 if ( !nombre || nombre === '' || !/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/i.test(nombre)) newErrors.nombre = 'Nombre inválido'
		// // rating errors
		 if ( !password || password ==="" || !/^.{8,12}$/i.test(password)) newErrors.password = 'Entre 8 y 12 caracteres'
		// // comment errors
		 if ( !telefono || telefono === '' || !/^.{10}$/i.test(telefono)) newErrors.telefono = 'Telefono inválido'
		
		 if ( !fecha_de_nacimiento || fecha_de_nacimiento === '') newErrors.nacimiento = 'Fecha inválida'

		 if ( !values.tipo_de_usuario || values.tipo_de_usuario === '') newErrors.rol = 'Seleccione un rol'
		// else if ( comment.length > 100 ) newErrors.comment = 'comment is too long!'

		return newErrors;
	};

	const setField = (field, value) => {
		setForm({
			...form,
			[field]: value,
		});
		// Check and see if errors exist, and remove them from the error object:
		if (!!errors[field])
			setErrors({
				...errors,
				[field]: null,
			});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newErrors = findFormErrors();
			// Conditional logic:
			if (Object.keys(newErrors).length > 0) {
				// We got errors!
				setErrors(newErrors);
			} else {
				const response = await auth.createUserWithEmailAndPassword(
					values.email,
					values.password
				);
				if (values.tipo_de_usuario == "Especialista") {
					try {
						db.collection("especialistas_pendientes")
							.doc(response.user.uid)
							.set({
								uid: response.user.uid,
								email,
								password,
								nombre,
								fecha_de_nacimiento,
								telefono,
								tipo_de_usuario,
								file,
								especialidad,
								rating,
								citas,
								biografia,
								isOnline,
							})
							.catch((err) => {
								console.log(err);
							});
					} catch (error) {
						console.log(error.message);
					}

					toast("Registro exitoso.");
					history.push("/");
				} else if (values.tipo_de_usuario == "Paciente") {
					try {
						db.collection("pacientes")
							.doc(response.user.uid)
							.set({
								uid: response.user.uid,
								email,
								password,
								nombre,
								fecha_de_nacimiento,
								telefono,
								tipo_de_usuario,
								file,
								especialidad,
								rating,
								citas,
								biografia,
								isOnline,
							})
							.catch((err) => {
								console.log(err);
							});
					} catch (error) {
						console.log(error.message);
					}

					toast("Registro exitoso.");
					history.push("/");
				}
			}
		} catch (error) {
			toast("Datos inválidos, verifíquelos.");
		}
	};

	return (
		<Container className="containerForm align-middle">
			<Row>
				<Col sm={6}>
					<Card className="card">
						<Card.Body>
							<Card.Title>Registro</Card.Title>
							{/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
							<Card.Text>
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
											onChange={handleOnChange}
											isInvalid={!!errors.email}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.email}
										</Form.Control.Feedback>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicPassword">
										<Form.Label>Contraseña</Form.Label>
										<Form.Control
											className="clave"
											name="password"
											id="password"
											type="password"
											placeholder="Ingresa tu contraseña"
											value={values.password}
											onChange={handleOnChange}
											isInvalid={!!errors.password}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.password}
										</Form.Control.Feedback>

										<Form.Text className="text-muted">
											Nunca compartas tu clave con nadie.
										</Form.Text>
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
											onChange={handleOnChange}
											isInvalid={!!errors.nombre}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.nombre}
										</Form.Control.Feedback>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicDate">
										<Form.Label>Fecha de nacimiento</Form.Label>
										<Form.Control
											className="date"
											type="date"
											id="fecha_de_nacimiento"
											name="fecha_de_nacimiento"
											value={values.fecha_de_nacimiento}
											onChange={handleOnChange}
											isInvalid={!!errors.nacimiento}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.nacimiento}
										</Form.Control.Feedback>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicPhone">
										<Form.Label>Teléfono</Form.Label>
										<Form.Control
											className="phone"
											type="number"
											id="telefono"
											placeholder="Ingrese su número telefónico"
											name="telefono"
											value={values.telefono}
											onChange={handleOnChange}
											isInvalid={!!errors.telefono}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.telefono}
										</Form.Control.Feedback>
									</Form.Group>

									<Form.Group className="mb-2" controlId="formBasicSpecialist">
										<Form.Check
												label="Especialista"
											className="specialist"
											type="radio"
											id="especialista"
											name="tipo_de_usuario"
											value="Especialista"
											onChange={handleOnChange}
											isInvalid={!!errors.rol}
										/>
										<Form.Check
												label="Paciente"
											className="pacient"
											type="radio"
											id="paciente"
											name="tipo_de_usuario"
											value="Paciente"
											onChange={handleOnChange}
											isInvalid={!!errors.rol}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.rol}
										</Form.Control.Feedback>
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
											/>

											<br />
											<Form.Label>Especialidad</Form.Label>
											<br />

											<Form.Group
												className="mb-2"
												controlId="formBasicSpecialist"
											>
												<Form.Check
												label="Psicología cognitiva"
													className="psicología cognitiva"
													type="radio"
													id="psicología cognitiva"
													name="especialidad"
													value="Psicología cognitiva"
													onChange={handleOnChange}
												/>
												<Form.Check
												label="Neuropsicología"
													className="neuropsicología"
													type="radio"
													id="neuropsicología"
													name="especialidad"
													value="Neuropsicología"
													onChange={handleOnChange}
												/>
												<Form.Check
												label="Psicología clínica"
													className="psicología clínica"
													type="radio"
													id="psicología clínica"
													name="especialidad"
													value="Psicología clínica"
													onChange={handleOnChange}
												/>
												<Form.Check
												label="Psicología evolutiva"
													className="psicología evolutiva"
													type="radio"
													id="psicología evolutiva"
													name="especialidad"
													value="Psicología evolutiva"
													onChange={handleOnChange}
												/>
												<Form.Control.Feedback type="invalid">
											{errors.especialidad}
										</Form.Control.Feedback>
											</Form.Group>

										</div>
									</Form.Group>

									<Button
										className="submitRegister"
										variant="primary"
										type="submit"
										onClick={handleSubmit}
									>
										Crear
									</Button>
								</Form>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col sm={6}>
					<img src={image} alt="" width="100%" />
				</Col>
			</Row>
		</Container>
	);
}

export default FormularioRegistro;