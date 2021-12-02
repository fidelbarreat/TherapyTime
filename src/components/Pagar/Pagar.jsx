import React, { useState, useContext, useEffect } from "react";
import {
	Container,
	Card,
	Button,
	Col,
	Stack,
	Form,
	Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { auth, db, st } from "../../utils/firebase-config";
import { UserContext } from "../UserContext";
import Paypal from "./Paypal";
import image from "../../images/login.png";
import "./Pagar.css";

var [info_pacient, setInfo_pacient] = [{}, () => {}];
var [info_specialist, setInfo_specialist] = [{}, () => {}];
function Pagar() {
	const { user, setUser } = useContext(UserContext);

	console.debug(auth.currentUser.uid);
	const docPacient = db.collection("pacientes").doc(auth.currentUser.uid);
	let docSpecialist = db.collection("especialistas");
	const history = useHistory();
	const [checkout, setCheckOut] = useState(false);

	[info_pacient, setInfo_pacient] = useState({
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
		uid: "",
        cant_rating: 0,
	});

	[info_specialist, setInfo_specialist] = useState({
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
		uid: "",
        cant_rating: 0,
	});

	const handleCancel = async (e) => {
		e.preventDefault();

		console.debug(info_pacient);
		const temporal_p = info_pacient.citas;
		temporal_p.pop();
		setInfo_pacient({ ...info_pacient, citas: temporal_p });

		try {
			docPacient.update(info_pacient);
		} catch (error) {
			console.log(error.message);
		}

		toast("Su solicitud ha sido cancelada");
		history.push("/");
	};

	useEffect(() => {
		docPacient.get().then((doc) => {
			setInfo_pacient(doc.data());
			
			docSpecialist = docSpecialist.doc(info_pacient.citas[info_pacient.citas.length - 1].uid_specialist);
			docSpecialist.get().then((esp) => {
				console.debug(esp.data());
				setInfo_specialist(esp.data());
			});
		});
	}, []);

	const handleSubmit = async (e) => {
		//e.preventDefault();

		const position = info_pacient.citas.length - 1;
		if (
			info_pacient &&
			info_pacient.citas &&
			info_pacient.citas[position]
		) {
			try {
				//cambiar por uid
				db.collection("consultas")
					.doc()
					.set(info_pacient.citas[position])
					.catch((err) => {
						console.log(err);
					});
				console.debug(info_specialist);
				const temporal_pa = info_specialist.citas;
				temporal_pa.push(info_pacient.citas[position]);
				setInfo_specialist({ ...info_specialist, citas: temporal_pa });
				console.debug(info_specialist);
				docSpecialist.update(info_specialist);
			} catch (error) {
				console.log(error.message);
			}

			toast("Pago exitoso, su cita fue agendada");
			history.push("/");
		} else {
			toast("Error");
		}
	};

	return (
		<>
			<Container>
				<Row>
					<Col sm={6}>
						<img src={image} alt="" width="100%" />
					</Col>
					<Col sm={6}>
						<Card className="card">
							<Card.Body>
								<Card.Title className="text-center justify-content">
									Checkout
								</Card.Title>
								{/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
								<Card.Text>
									<Paypal
										onchange={(e) => {
											handleSubmit(e);
										}}
									/>
									<Button
										className="cancelarCita"
										type="submit"
										onClick={handleCancel}
									>
										Cancelar cita
									</Button>
									{/* <Button
										className="cancelarCita"
										type="submit"
										onClick={handleSubmit}
									>
										Pagar
									</Button> */}
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Pagar;
