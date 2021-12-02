import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Col, Stack, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker, { setHours, setMinutes } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth, db, st } from "../../utils/firebase-config";
import { UserContext } from "../UserContext";
import { Link, useHistory } from "react-router-dom";
import { getFirstElementArrayCollection } from "../../Parsers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../../images/register.png";

function Reservar_Cita() {
	const h = useHistory();
	const { user, setUser } = useContext(UserContext);
	let { email, nombre } = useParams();
	const docPacient = db.collection("pacientes").doc(auth.currentUser.uid);

	const [consultas, setConsultas] = useState([]);
	const ref = db.collection("consultas");

	function getConsultas() {
		ref.onSnapshot((querySnapshot) => {
			const items = [];
			querySnapshot.forEach((doc) => {
				items.push(doc.data());
			});
			setConsultas([...consultas, ...items]);
		});
	}

	useEffect(() => {
		getConsultas();
	}, []);

	const [info_pacient, setInfo_pacient] = useState({
		email: "",
		password: "",
		nombre: "",
		fecha_de_nacimiento: "",
		telefono: "",
		tipo_de_usuario: "",
		file: "",
		especialidad: "",
		rating: 0,
		cant_rating: 0,
		citas: [],
		biografia: "",
		uid: ""
	});

	useEffect(() => {
		docPacient.get().then((doc) => {
			setInfo_pacient(doc.data());
		});
	}, []);

	const [values, setValues] = useState({
		uid_specialist: atob(email),
		name_specialist: atob(nombre),
		name_pacient: user.nombre,
		uid_pacient: auth.currentUser.uid,
		price: "20$",
		dateTime: "",
		comentario: "",
		expediente: ""
	});

	const handleOnChange = (event) => {
		setValues({ ...values, comentario: event.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let cita_repetida = false;
		for (let consulta of consultas) {
			if (atob(email) == consulta.uid_specialist && fecha == consulta.dateTime) {
				cita_repetida = true;
				break;
			}
		}
		if (!cita_repetida) {
			console.debug(info_pacient);
			const temporal_p = info_pacient.citas;
			temporal_p.push(values);
			setInfo_pacient({ ...info_pacient, citas: temporal_p });

			try {
				docPacient.update(info_pacient);
				h.push("/Pagar");
				toast("¡Solo un paso más!");
			} catch (error) {
				console.log(error.message);
			}
		} else {
			toast("¡Ups, tu especialista se encuentra ocupado!");
		}
	};

	const [fecha, setFecha] = useState();

	const fecha_minima = new Date();
	fecha_minima.setDate(fecha_minima.getDate() + 1);

	const onChange = (fecha) => {
		setValues({ ...values, dateTime: fecha.toString() });
		setFecha(fecha);
	};

	return (
		<Container className="text-center justify-content">
			<Row>
				<Col sm={6}>
					<Card className="card">
						<Card.Body>
							<Card.Title>Reservar Cita</Card.Title>
							{/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
							<Card.Text>
								<p>
									Especialista:  <b>{atob(nombre)}</b>
								</p>
								<p>
									Monto:  <b>$20</b>
								</p>

								<div className="contenedor">
									<div className="center">
                    <p>Seleccione un horario:</p>
										<DatePicker
											selected={fecha}
											timeIntervals={60}
											onChange={onChange}
											minDate={fecha_minima}
											maxDate={new Date("2022", "11", "24")}
											showDisabledMonthNavigation
											showTimeSelect
											minTime = {fecha_minima.setHours(8,0,0,0)}
											maxTime = {fecha_minima.setHours(15,0,0,0)}
											dateFormat="d/MM/yyyy h:mm aa"
										/>
										<br />
										<br />
										<Form.Group className="mb-3">
											<Form.Label>
												Díganos cuál es el motivo de la cita
											</Form.Label>
											<Form.Control
												className="comentario"
												type="text"
												id="comentario"
												name="comentario"
												value={values.comentario}
												onChange={handleOnChange}
											/>
										</Form.Group>

										<br />
										<br />

										<Button
											className="submitRegister"
											variant="primary"
											type="submit"
											onClick={handleSubmit}
										>
											Continuar
										</Button>
									</div>
								</div>
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

export default Reservar_Cita;
