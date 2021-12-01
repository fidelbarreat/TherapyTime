import React, {useState, useEffect} from 'react'
import { Form, Button} from "react-bootstrap";
import { db } from "../../utils/firebase-config";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Feedback = () => {
    const [consultas, setConsultas] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const history = useHistory();

    const [values, setValues] = useState({
        uid_patient: user.uid,
        name_patient: user.nombre,
        uid_specialist: "",
        name_specialist: "",
        comentario: "",
        rating: ""
    })

    useEffect(() => {
        const usersRef = db.collection("consultas");
        const q = usersRef.where("uid_pacient", "==", user.uid);
        const unsub = q.onSnapshot((querySnapshot) => {
        let people = [];
        querySnapshot.forEach((doc) => {
            people.push(doc.data());
        });
        setConsultas([...consultas,...people]);
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
            db.collection("feedback")
                .doc()
                .set(values)
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error.message);
        }

        toast("¡Comentario publicado!");
        history.push("/");
		
	};
    return(
    <Form className="form">
        <Form.Group className="mb-3">
            <Form.Label>
                Deje su comentario
            </Form.Label>
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
            <Form.Label>
                Puntuación
            </Form.Label>
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
    );
};

export default Feedback;