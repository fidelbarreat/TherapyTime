import React, { useState, useEffect } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import { db } from "../../utils/firebase-config";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var [info_specialist, setInfo_specialist] = [{}, () => {}];
const Feedback = () => {
	const [consultas, setConsultas] = useState([]);
	const { user, setUser } = useContext(UserContext);
	let docSpecialist = db.collection("especialistas").doc("fjHKSJPkoKVHtmLFP3w89kPDaA23");//Cambiar
	const history = useHistory();

	const [values, setValues] = useState({
		uid_patient: user.uid,
		name_patient: user.nombre,
		uid_specialist: "",
		name_specialist: "",
		comentario: "",
		rating: 0,
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

	useEffect(() => {
		const usersRef = db.collection("consultas");
		const q = usersRef.where(
			"uid_pacient",
			"==",
			"fjHKSJPkoKVHtmLFP3w89kPDaA23"//Cambiar
		);
			docSpecialist.get().then((esp) => {
				console.debug(esp.data());
				setInfo_specialist(esp.data());
			});
		const unsub = q.onSnapshot((querySnapshot) => {
			let people = [];
			querySnapshot.forEach((doc) => {
				people.push(doc.data());
			});
			setConsultas([...consultas, ...people]);
		});
		return () => unsub();
	}, []);

	const handleOnChange = (event) => {
		const { value, name: inputName } = event.target;
		console.log({ inputName, value });
		setValues({ ...values, [inputName]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            values.uid_specialist = info_specialist.uid;
            values.name_specialist = info_specialist.nombre;
			db.collection("feedback")
				.doc()
				.set(values)
				.catch((err) => {
					console.log(err);
				});
                info_specialist.rating = (info_specialist.rating * info_specialist.cant_rating + values.rating) / info_specialist.cant_rating;
                info_specialist.cant_rating += 1;
                docSpecialist.update(info_specialist);

		} catch (error) {
			console.log(error.message);
		}

		toast("¡Comentario publicado!");
		history.push("/");
	};
	return (
		<Container className="text-center justify-content">
			<Row>
				<Form className="form">
					<Form.Group className="mb-3">
						<Form.Label>Deje su comentario</Form.Label>
						<Form.Control
							className="comentario"
							type="text"
							id="comentario"
							name="comentario"
							placeholder="Agregue un comentario"
							value={values.comentario}
							onChange={handleOnChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Puntuación</Form.Label>
						<Form.Control
							className="rating"
							type="number"
							min="0"
							max="5"
							placeholder="Deje su calificación"
							id="rating"
							name="rating"
							value={values.rating}
							onChange={handleOnChange}
						/>
					</Form.Group>

					<Button
						className="feedbackSubmit"
						variant="primary"
						type="button"
						onClick={handleSubmit}
					>
						Publicar
					</Button>
				</Form>
			</Row>
		</Container>
	);
};

export default Feedback;
