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
		setField(inputName, e.target.value);
		const { value, name: inputName } = e.target;
		setValues({ ...values, [inputName]: value });
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
		const { email } = form;
		const newErrors = {};
		// name errors
		if (!email || email === "") newErrors.name = "cannot be blank!";
		// else if ( name.length > 30 ) newErrors.name = 'name is too long!'
		// // food errors
		// if ( !food || food === '' ) newErrors.food = 'select a food!'
		// // rating errors
		// if ( !rating || rating > 5 || rating < 1 ) newErrors.rating = 'must assign a rating between 1 and 5!'
		// // comment errors
		// if ( !comment || comment === '' ) newErrors.comment = 'cannot be blank!'
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
											isInvalid={!!errors.name}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.name}
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
											required
											value={values.password}
											onChange={handleOnChange}
										/>

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
										/>
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
										/>
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
										/>
									</Form.Group>

									<Form.Group className="mb-2" controlId="formBasicSpecialist">
										<Form.Label>Especialista</Form.Label>
										<Form.Check
											className="specialist"
											type="radio"
											id="especialista"
											name="tipo_de_usuario"
											value="Especialista"
											onChange={handleOnChange}
										/>
									</Form.Group>

									<Form.Group className="mb-2" controlId="formBasicPacient">
										<Form.Label>Paciente</Form.Label>
										<Form.Check
											className="pacient"
											type="radio"
											id="paciente"
											name="tipo_de_usuario"
											value="Paciente"
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
											<br />
											<Form.Group
												className="mb-2"
												controlId="formBasicSpecialist"
											>
												<Form.Label>Psicología cognitiva</Form.Label>
												<Form.Check
													className="psicología cognitiva"
													type="radio"
													id="psicología cognitiva"
													name="especialidad"
													value="Psicología cognitiva"
													onChange={handleOnChange}
												/>
											</Form.Group>

											<Form.Group
												className="mb-2"
												controlId="formBasicSpecialist"
											>
												<Form.Label>Neuropsicología</Form.Label>
												<Form.Check
													className="neuropsicología"
													type="radio"
													id="neuropsicología"
													name="especialidad"
													value="Neuropsicología"
													onChange={handleOnChange}
												/>
											</Form.Group>

											<Form.Group
												className="mb-2"
												controlId="formBasicSpecialist"
											>
												<Form.Label>Psicología clínica</Form.Label>
												<Form.Check
													className="psicología clínica"
													type="radio"
													id="psicología clínica"
													name="especialidad"
													value="Psicología clínica"
													onChange={handleOnChange}
												/>
											</Form.Group>

											<Form.Group
												className="mb-2"
												controlId="formBasicSpecialist"
											>
												<Form.Label>Psicología evolutiva</Form.Label>
												<Form.Check
													className="psicología evolutiva"
													type="radio"
													id="psicología evolutiva"
													name="especialidad"
													value="Psicología evolutiva"
													onChange={handleOnChange}
												/>
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