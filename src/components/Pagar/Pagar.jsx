import React, { useState, useContext, useEffect } from 'react';
import {Container, Card, Button, Col, Stack, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import { auth, db, st } from "../../utils/firebase-config";
import { UserContext } from "../UserContext";


function Pagar() {

    const { user, setUser } = useContext(UserContext);
    const docPacient = db.collection("pacientes").doc(auth.currentUser.uid);
    const history = useHistory();

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

        const temporal_p = info_pacient.citas
        temporal_p.pop()
        setInfo_pacient({ ...info_pacient, citas: temporal_p });

        try {
            docPacient.update(info_pacient);
          } catch (error) {
            console.log(error.message);
          }

        toast('Su solicitud ha sido cancelada');
        history.push("/");						
    };

    useEffect(() => {
		docPacient.get().then((doc) => {
			setInfo_pacient(doc.data());
		});
	}, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const position = info_pacient.citas.length-1;
        try {
            db.collection("consultas").doc().set(info_pacient.citas[position]).catch((err) => {
                toast('Pago exitoso,  su cita fue agendada')
                console.log(err);
            });
          } catch (error) {
            console.log(error.message);
          }

        toast('Pago exitoso,  su cita fue agendada')
        history.push("/");	

        };



    return (
        <>
    <Container className="text-center">
    <Button
        className="submitRegister"
        variant="primary"
        type="submit"
        onClick={handleCancel}
    >
        Cancelar cita
    </Button>

    <br/><br/><br/>
    <Button
		className="submitRegister"
		variant="primary"
		type="submit"
        onClick={handleSubmit}
	>   
		Pagar
	</Button>
    </Container>
    </>
    );
  }
  
  export default Pagar;