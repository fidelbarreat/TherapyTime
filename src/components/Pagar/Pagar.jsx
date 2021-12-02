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

function Pagar() {
	const { user, setUser } = useContext(UserContext);
  console.debug(auth.currentUser.uid);
	const docPacient = db.collection("pacientes").doc(auth.currentUser.uid);
	const history = useHistory();
	const [checkout, setCheckOut] = useState(false);

	const [info_pacient, setInfo_pacient] = useState({
		email: "",
		password: "",
		nombre: "",
		fecha_de_nacimiento: "",
		telefono: "",
		tipo_de_usuario: "",
		file: "",
		especialidad: "",
		rating: "",
		citas: [],
		biografia: "",
	});

	const handleCancel = async (e) => {
		e.preventDefault();

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
      console.debug(doc.data());
			setInfo_pacient(doc.data());
		});
	}, []);

	const handleSubmit = async (e) => {
		//e.preventDefault();

		const position = info_pacient.citas.length - 1;
    console.debug(info_pacient);
    console.debug(info_pacient.citas);
    console.debug(info_pacient.citas[position]);
		try {
			db.collection("consultas")
				.doc()
				.set(info_pacient.citas[position])
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error.message);
		}

		toast("Pago exitoso, su cita fue agendada");
		history.push("/");
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
								<Card.Title className="text-center justify-content">Checkout</Card.Title>
								{/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
								<Card.Text>
									<Paypal onchange={(e) => { handleSubmit(e) }}/>
									<Button
										className="cancelarCita"
										type="submit"
										onClick={handleCancel}
									>
										Cancelar cita
									</Button>
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
