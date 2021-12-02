import React, {useState,useEffect, useContext} from 'react';
import { db } from "../../utils/firebase-config";
import { Card, Button, Col, Row, Form, Container} from "react-bootstrap";
import { UserContext } from "../UserContext";
import { st, auth } from "../../utils/firebase-config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link } from "react-router-dom";

export default function Expedientes(){

    const [consultas, setConsultas] = useState([]);
    const [id_consultas, setId_consultas] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const [values, setValues] = useState({
		uid_specialist: "",
		name_specialist: "",
		name_pacient: "",
		uid_pacient: "",
		price: "20$",
		dateTime: "",
		comentario: "",
        expediente: ""
	});

    useEffect(() => {
        const usersRef = db.collection( "consultas");
        // create query object
        const q = usersRef.where("uid_specialist", "==", user.uid);
        // execute query
        const unsub = q.onSnapshot((querySnapshot) => {
        let people = [];
        let ids = [];
        querySnapshot.forEach((doc) => {
            people.push(doc.data());
            ids.push(doc.id)
        });
        setConsultas([...consultas,...people]);
        setId_consultas([...id_consultas,...ids]);
        });
        return () => unsub();
        
    }, []);

    let url_expediente = ""
    const handleOnFile = async (e) => {
		try {
			const archivolocal = e.target.files[0];
			const currRef = st.ref().child(`expedientes/${archivolocal.name}`);
			await currRef.put(archivolocal);
			const urlFile = await currRef.getDownloadURL();
            url_expediente = urlFile;
		} catch (error) {
			console.log(error.message);
		}
	};

    const handleSubmit = async (index) => {
        let copia_consultas = consultas[index];
        copia_consultas.expediente = url_expediente;

		try {
			const docRef = db.collection("consultas").doc(id_consultas[index]);
			docRef.update(copia_consultas);
			toast("¡Tus datos se han guardado exitosamente!");
		} catch (error) {
			console.log(error.message);
		}
    }
    
    console.log(values)
    return(
        <Container className ="my-3 text-center">
            <h1>Historia de pacientes</h1>
            <Row>
			    {consultas &&
                consultas.map((consulta, index) => {
                    let name = consulta.name_pacient;
                    return(
                        
                        <Col xs= {6}>
                        <Card className="text-center" border={'dark'}>
                            <Card.Body>
                                <Card.Title>{consulta.dateTime}</Card.Title>
                                <Card.Text>
                                <b>{name}</b>
                                </Card.Text>

                                <Form.Label>
									Suba expediente del paciente .pdf
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

                                <Button as={Col} className="btn-sm" variant="secondary" onClick={() => handleSubmit(index)}>
                                    Guardar expediente
                                </Button>{' '}
                            </Card.Body>

                    <Card.Footer className="text-muted"><a href={consulta.expediente} download target="_blank">Descargar expediente</a></Card.Footer>

                    </Card>
                    </Col>
                )})}
                </Row>
        </Container>
            
        
    )
}